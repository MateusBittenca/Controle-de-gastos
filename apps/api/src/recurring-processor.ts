import { query } from './db.js';
import type { RecurFreq } from './types.js';

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Avança uma data ISO (YYYY-MM-DD) conforme a frequência */
export function advanceRecurringDate(dateStr: string, freq: RecurFreq): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);

  if (freq === 'weekly') {
    dt.setDate(dt.getDate() + 7);
  } else if (freq === 'monthly') {
    dt.setMonth(dt.getMonth() + 1);
  } else {
    dt.setFullYear(dt.getFullYear() + 1);
  }

  const ny = dt.getFullYear();
  const nm = String(dt.getMonth() + 1).padStart(2, '0');
  const nd = String(dt.getDate()).padStart(2, '0');
  return `${ny}-${nm}-${nd}`;
}

type RecurringRow = {
  id: string;
  type: string;
  category_id: string;
  description: string;
  amount: string;
  frequency: RecurFreq;
  next_date: Date | string;
};

function toDateStr(v: Date | string): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v).slice(0, 10);
}

async function transactionExists(
  userId: string,
  date: string,
  categoryId: string,
  description: string,
  amount: number,
): Promise<boolean> {
  const res = await query<{ id: string }>(
    `SELECT id FROM transactions
     WHERE user_id = $1 AND transaction_date = $2
       AND category_id = $3 AND description = $4 AND amount = $5
       AND is_recurring = TRUE
     LIMIT 1`,
    [userId, date, categoryId, description, amount],
  );
  return res.rows.length > 0;
}

/**
 * Gera transações para recorrentes com next_date <= hoje e avança a próxima data.
 * Se o usuário ficar vários meses sem abrir o app, gera todas as parcelas em atraso.
 */
export async function processDueRecurring(userId: string): Promise<number> {
  const today = todayISO();
  const res = await query<RecurringRow>(
    `SELECT id, type, category_id, description, amount, frequency, next_date
     FROM recurring WHERE user_id = $1`,
    [userId],
  );

  let generated = 0;

  for (const row of res.rows) {
    let next = toDateStr(row.next_date);
    const freq = row.frequency;
    const amount = Number(row.amount);

    while (next <= today) {
      const exists = await transactionExists(
        userId,
        next,
        row.category_id,
        row.description,
        amount,
      );

      if (!exists) {
        await query(
          `INSERT INTO transactions (
            user_id, type, category_id, description, amount, transaction_date, is_recurring
          ) VALUES ($1, $2, $3, $4, $5, $6, TRUE)`,
          [userId, row.type, row.category_id, row.description, amount, next],
        );
        generated++;
      }

      next = advanceRecurringDate(next, freq);
    }

    await query(
      `UPDATE recurring SET next_date = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3`,
      [next, row.id, userId],
    );
  }

  return generated;
}
