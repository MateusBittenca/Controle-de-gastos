import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { hashPin, verifyPin } from '../auth.js';
import { query } from '../db.js';
import { mapGoal, mapRecurring, mapTransaction } from '../mappers.js';
import { fetchAppState } from '../state.js';

const bankBalanceSchema = z.object({
  amount: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const txnSchema = z.object({
  type: z.enum(['income', 'expense']),
  cat: z.string(),
  desc: z.string().min(1),
  amt: z.number().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  isRecur: z.boolean().optional(),
});

const goalSchema = z.object({
  name: z.string().min(1),
  icon: z.string().default('star'),
  target: z.number().positive(),
  current: z.number().min(0).default(0),
});

const recurSchema = z.object({
  type: z.enum(['income', 'expense']),
  cat: z.string(),
  desc: z.string().min(1),
  amt: z.number().positive(),
  freq: z.enum(['weekly', 'monthly', 'yearly']),
  next: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function resourceRoutes(app: FastifyInstance) {
  app.post('/api/transactions', async (request, reply) => {
    const uid = request.userId!;
    const body = txnSchema.safeParse(request.body);
    if (!body.success) return reply.status(400).send({ error: 'Dados inválidos' });

    const { type, cat, desc, amt, date, isRecur } = body.data;
    const res = await query(
      `INSERT INTO transactions (user_id, type, category_id, description, amount, transaction_date, is_recurring)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, type, category_id, description, amount, transaction_date, is_recurring`,
      [uid, type, cat, desc, amt, date, !!isRecur],
    );
    const txn = mapTransaction(res.rows[0] as Parameters<typeof mapTransaction>[0]);

    if (isRecur) {
      await query(
        `INSERT INTO recurring (user_id, type, category_id, description, amount, frequency, next_date)
         VALUES ($1, $2, $3, $4, $5, 'monthly', $6)`,
        [uid, type, cat, desc, amt, date],
      );
    }

    return txn;
  });

  app.post('/api/transactions/bulk', async (request, reply) => {
    const uid = request.userId!;
    const rows = z.array(txnSchema).safeParse(request.body);
    if (!rows.success) return reply.status(400).send({ error: 'Dados inválidos' });

    let added = 0;
    for (const t of rows.data) {
      await query(
        `INSERT INTO transactions (user_id, type, category_id, description, amount, transaction_date)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [uid, t.type, t.cat, t.desc, t.amt, t.date],
      );
      added++;
    }
    return { added };
  });

  app.delete('/api/transactions/:id', async (request, reply) => {
    const uid = request.userId!;
    const { id } = request.params as { id: string };
    await query(`DELETE FROM transactions WHERE id = $1 AND user_id = $2`, [
      id,
      uid,
    ]);
    return { ok: true };
  });

  app.put('/api/budgets/:categoryId', async (request, reply) => {
    const uid = request.userId!;
    const { categoryId } = request.params as { categoryId: string };
    const body = z.object({ limit: z.number().positive() }).safeParse(request.body);
    if (!body.success) return reply.status(400).send({ error: 'Dados inválidos' });

    await query(
      `INSERT INTO budgets (user_id, category_id, limit_amount)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, category_id) DO UPDATE SET limit_amount = $3, updated_at = NOW()`,
      [uid, categoryId, body.data.limit],
    );
    return { categoryId, limit: body.data.limit };
  });

  app.delete('/api/budgets/:categoryId', async (request) => {
    const uid = request.userId!;
    const { categoryId } = request.params as { categoryId: string };
    await query(`DELETE FROM budgets WHERE user_id = $1 AND category_id = $2`, [
      uid,
      categoryId,
    ]);
    return { ok: true };
  });

  app.post('/api/goals', async (request, reply) => {
    const uid = request.userId!;
    const body = goalSchema.safeParse(request.body);
    if (!body.success) return reply.status(400).send({ error: 'Dados inválidos' });

    const res = await query(
      `INSERT INTO goals (user_id, name, icon, target_amount, current_amount)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, icon, target_amount, current_amount`,
      [uid, body.data.name, body.data.icon, body.data.target, body.data.current],
    );
    return mapGoal(res.rows[0] as Parameters<typeof mapGoal>[0]);
  });

  app.patch('/api/goals/:id', async (request, reply) => {
    const uid = request.userId!;
    const { id } = request.params as { id: string };
    const body = z
      .object({ current: z.number().min(0).optional(), addAmount: z.number().positive().optional() })
      .safeParse(request.body);
    if (!body.success) return reply.status(400).send({ error: 'Dados inválidos' });

    if (body.data.addAmount != null) {
      await query(
        `UPDATE goals SET current_amount = LEAST(target_amount, current_amount + $1), updated_at = NOW()
         WHERE id = $2 AND user_id = $3`,
        [body.data.addAmount, id, uid],
      );
    } else if (body.data.current != null) {
      await query(
        `UPDATE goals SET current_amount = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3`,
        [body.data.current, id, uid],
      );
    }

    const res = await query(
      `SELECT id, name, icon, target_amount, current_amount FROM goals WHERE id = $1 AND user_id = $2`,
      [id, uid],
    );
    if (!res.rows[0]) return reply.status(404).send({ error: 'Meta não encontrada' });
    return mapGoal(res.rows[0] as Parameters<typeof mapGoal>[0]);
  });

  app.delete('/api/goals/:id', async (request) => {
    const uid = request.userId!;
    const { id } = request.params as { id: string };
    await query(`DELETE FROM goals WHERE id = $1 AND user_id = $2`, [id, uid]);
    return { ok: true };
  });

  app.post('/api/recurring', async (request, reply) => {
    const uid = request.userId!;
    const body = recurSchema.safeParse(request.body);
    if (!body.success) return reply.status(400).send({ error: 'Dados inválidos' });

    const res = await query(
      `INSERT INTO recurring (user_id, type, category_id, description, amount, frequency, next_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, type, category_id, description, amount, frequency, next_date`,
      [uid, body.data.type, body.data.cat, body.data.desc, body.data.amt, body.data.freq, body.data.next],
    );
    return mapRecurring(res.rows[0] as Parameters<typeof mapRecurring>[0]);
  });

  app.delete('/api/recurring/:id', async (request) => {
    const uid = request.userId!;
    const { id } = request.params as { id: string };
    await query(`DELETE FROM recurring WHERE id = $1 AND user_id = $2`, [id, uid]);
    return { ok: true };
  });

  app.patch('/api/profile', async (request, reply) => {
    const uid = request.userId!;
    const body = z
      .object({
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
        salary: z.number().min(0).optional(),
        currency: z.enum(['BRL', 'USD', 'EUR', 'GBP']).optional(),
        avatarSrc: z.string().max(600_000).nullable().optional(),
        prefs: z
          .object({
            budgetAlert: z.boolean().optional(),
            goalAlert: z.boolean().optional(),
            hideValues: z.boolean().optional(),
          })
          .optional(),
        theme: z.enum(['light', 'dark']).optional(),
      })
      .safeParse(request.body);
    if (!body.success) return reply.status(400).send({ error: 'Dados inválidos' });

    const d = body.data;
    if (d.name != null || d.email != null || d.salary != null || d.currency != null || d.avatarSrc !== undefined) {
      await query(
        `UPDATE users SET
          name = COALESCE($1, name),
          email = COALESCE($2, email),
          salary = COALESCE($3, salary),
          currency = COALESCE($4, currency),
          avatar_url = COALESCE($5, avatar_url),
          updated_at = NOW()
         WHERE id = $6`,
        [
          d.name ?? null,
          d.email?.toLowerCase() ?? null,
          d.salary ?? null,
          d.currency ?? null,
          d.avatarSrc === undefined ? null : d.avatarSrc,
          uid,
        ],
      );
    }

    if (d.prefs || d.theme) {
      await query(
        `UPDATE user_preferences SET
          budget_alert = COALESCE($1, budget_alert),
          goal_alert = COALESCE($2, goal_alert),
          hide_values = COALESCE($3, hide_values),
          theme = COALESCE($4, theme)
         WHERE user_id = $5`,
        [
          d.prefs?.budgetAlert ?? null,
          d.prefs?.goalAlert ?? null,
          d.prefs?.hideValues ?? null,
          d.theme ?? null,
          uid,
        ],
      );
    }

    return fetchAppState(uid);
  });

  app.put('/api/bank-balance', async (request, reply) => {
    const uid = request.userId!;
    const body = bankBalanceSchema.safeParse(request.body);
    if (!body.success) return reply.status(400).send({ error: 'Dados inválidos' });

    const { amount, date } = body.data;
    await query(
      `UPDATE users SET
        bank_balance = $1,
        bank_balance_date = $2,
        bank_balance_updated_at = NOW(),
        updated_at = NOW()
       WHERE id = $3`,
      [amount, date, uid],
    );

    const state = await fetchAppState(uid);
    return {
      bankBalance: state.bankBalance,
      expectedBalance: state.expectedBalance,
      difference: state.difference,
    };
  });

  app.patch('/api/profile/pin', async (request, reply) => {
    const uid = request.userId!;
    const body = z.object({ pin: z.string().regex(/^\d{4}$/) }).safeParse(request.body);
    if (!body.success) return reply.status(400).send({ error: 'PIN deve ter 4 dígitos' });

    const hash = await hashPin(body.data.pin);
    await query(`UPDATE users SET pin_hash = $1, updated_at = NOW() WHERE id = $2`, [
      hash,
      uid,
    ]);
    return { ok: true };
  });

  app.post('/api/profile/verify-pin', async (request, reply) => {
    const uid = request.userId!;
    const body = z.object({ pin: z.string() }).safeParse(request.body);
    if (!body.success) return reply.status(400).send({ error: 'Dados inválidos' });

    const res = await query<{ pin_hash: string | null }>(
      `SELECT pin_hash FROM users WHERE id = $1`,
      [uid],
    );
    const ok = await verifyPin(res.rows[0]?.pin_hash ?? null, body.data.pin);
    if (!ok) return reply.status(401).send({ error: 'PIN incorreto' });
    return { ok: true };
  });

  app.post('/api/data/clear', async (request) => {
    const uid = request.userId!;
    await query(`DELETE FROM transactions WHERE user_id = $1`, [uid]);
    await query(`DELETE FROM budgets WHERE user_id = $1`, [uid]);
    await query(`DELETE FROM goals WHERE user_id = $1`, [uid]);
    await query(`DELETE FROM recurring WHERE user_id = $1`, [uid]);
    await query(`UPDATE users SET streak_days = 0 WHERE id = $1`, [uid]);
    return fetchAppState(uid);
  });

  app.post('/api/data/reset-demo', async (request, reply) => {
    if (process.env.NODE_ENV === 'production') {
      return reply.status(403).send({ error: 'Não disponível em produção' });
    }
    const uid = request.userId!;
    await query(`DELETE FROM transactions WHERE user_id = $1`, [uid]);
    await query(`DELETE FROM budgets WHERE user_id = $1`, [uid]);
    await query(`DELETE FROM goals WHERE user_id = $1`, [uid]);
    await query(`DELETE FROM recurring WHERE user_id = $1`, [uid]);

    const demoId = 'a0000000-0000-4000-8000-000000000001';
    if (uid === demoId) {
      await query(`SELECT 1`);
    }

    const ins = async (sql: string, params: unknown[]) => query(sql, params);

    const d = (day: number, mo = 0) => {
      const now = new Date();
      const dt = new Date(now.getFullYear(), now.getMonth() - mo, day);
      return dt.toISOString().slice(0, 10);
    };

    const txns: [string, string, string, number, string][] = [
      ['income', 'salary', 'Salário', 8000, d(5)],
      ['income', 'freelance', 'Projeto UI/UX', 1400, d(12)],
      ['expense', 'housing', 'Aluguel', 1800, d(6)],
      ['expense', 'food', 'Supermercado', 340, d(8)],
      ['expense', 'transport', 'Combustível', 180, d(10)],
      ['expense', 'utilities', 'Energia elétrica', 210, d(15)],
      ['expense', 'leisure', 'Restaurante', 95, d(18)],
      ['expense', 'health', 'Farmácia', 85, d(20)],
      ['income', 'salary', 'Salário', 8000, d(5, 1)],
      ['expense', 'housing', 'Aluguel', 1800, d(6, 1)],
      ['expense', 'food', 'Supermercado', 290, d(9, 1)],
      ['expense', 'transport', 'Uber', 140, d(14, 1)],
    ];
    for (const [type, cat, desc, amt, date] of txns) {
      await ins(
        `INSERT INTO transactions (user_id, type, category_id, description, amount, transaction_date)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [uid, type, cat, desc, amt, date],
      );
    }

    const budgets: [string, number][] = [
      ['housing', 2000],
      ['food', 600],
      ['transport', 300],
      ['health', 200],
      ['leisure', 300],
      ['utilities', 250],
    ];
    for (const [cat, limit] of budgets) {
      await ins(
        `INSERT INTO budgets (user_id, category_id, limit_amount) VALUES ($1, $2, $3)`,
        [uid, cat, limit],
      );
    }

    const goals: [string, string, number, number][] = [
      ['Fundo de emergência', 'shield', 30000, 20100],
      ['Viagem Europa', 'plane', 15000, 4500],
      ['Notebook novo', 'laptop', 6000, 2200],
    ];
    for (const [name, icon, target, current] of goals) {
      await ins(
        `INSERT INTO goals (user_id, name, icon, target_amount, current_amount) VALUES ($1, $2, $3, $4, $5)`,
        [uid, name, icon, target, current],
      );
    }

    const recurs: [string, string, string, number, string][] = [
      ['expense', 'housing', 'Aluguel', 1800, d(0)],
      ['expense', 'utilities', 'Energia', 210, d(0)],
      ['expense', 'leisure', 'Streaming', 45, d(0)],
      ['income', 'salary', 'Salário', 8000, d(0)],
    ];
    for (const [type, cat, desc, amt, next] of recurs) {
      await ins(
        `INSERT INTO recurring (user_id, type, category_id, description, amount, frequency, next_date)
         VALUES ($1, $2, $3, $4, $5, 'monthly', $6)`,
        [uid, type, cat, desc, amt, next],
      );
    }

    await query(`UPDATE users SET salary = 8000, streak_days = 12 WHERE id = $1`, [uid]);
    return fetchAppState(uid);
  });

  app.get('/api/categories', async () => {
    const res = await query(
      `SELECT id, name, type, icon, color, bg_color FROM categories ORDER BY type, name`,
    );
    return res.rows.map((r) => ({
      id: r.id,
      name: r.name,
      type: r.type,
      icon: r.icon,
      color: r.color,
      bg: r.bg_color,
    }));
  });
}
