import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import {
  clearAuthCookie,
  loginSchema,
  loginUser,
  registerSchema,
  registerUser,
  setAuthCookie,
  signToken,
} from '../auth.js';
import { query } from '../db.js';
import {
  requestPasswordReset,
  resetPasswordWithToken,
} from '../password-reset.js';
import { processDueRecurring } from '../recurring-processor.js';
import { fetchAppState } from '../state.js';

const forgotSchema = z.object({ email: z.string().email() });
const resetSchema = z.object({
  token: z.string().min(32),
  password: z.string().min(6).max(128),
});

export async function authRoutes(app: FastifyInstance) {
  app.post('/api/auth/register', async (request, reply) => {
    const body = registerSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Dados inválidos' });
    }
    try {
      const user = await registerUser(
        body.data.name,
        body.data.email,
        body.data.password,
      );
      const token = signToken({ sub: user.id, email: user.email });
      setAuthCookie(reply, token);
      return { user: { id: user.id, email: user.email, name: user.name } };
    } catch (e) {
      if ((e as Error).message === 'EMAIL_EXISTS') {
        return reply.status(409).send({ error: 'E-mail já cadastrado' });
      }
      throw e;
    }
  });

  app.post('/api/auth/login', async (request, reply) => {
    const body = loginSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Dados inválidos' });
    }
    const user = await loginUser(body.data.email, body.data.password);
    if (!user) {
      return reply.status(401).send({ error: 'E-mail ou senha incorretos' });
    }
    const token = signToken({ sub: user.id, email: user.email });
    setAuthCookie(reply, token);
    return { user };
  });

  app.post('/api/auth/logout', async (_request, reply) => {
    clearAuthCookie(reply);
    return { ok: true };
  });

  app.post('/api/auth/forgot-password', async (request, reply) => {
    const body = forgotSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'E-mail inválido' });
    }
    const extra = await requestPasswordReset(body.data.email);
    return {
      message:
        'Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.',
      ...extra,
    };
  });

  app.post('/api/auth/reset-password', async (request, reply) => {
    const body = resetSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Dados inválidos' });
    }
    const ok = await resetPasswordWithToken(body.data.token, body.data.password);
    if (!ok) {
      return reply.status(400).send({
        error: 'Link inválido ou expirado. Solicite um novo e-mail de recuperação.',
      });
    }
    return { message: 'Senha redefinida com sucesso. Faça login com a nova senha.' };
  });

  app.get('/api/auth/me', async (request, reply) => {
    if (!request.userId) {
      return reply.status(401).send({ error: 'Não autenticado' });
    }
    const res = await query<{ id: string; email: string; name: string }>(
      `SELECT id, email, name FROM users WHERE id = $1`,
      [request.userId],
    );
    const user = res.rows[0];
    if (!user) return reply.status(404).send({ error: 'Usuário não encontrado' });
    return { user };
  });

  app.get('/api/state', async (request, reply) => {
    if (!request.userId) {
      return reply.status(401).send({ error: 'Não autenticado' });
    }
    const recurringGenerated = await processDueRecurring(request.userId);
    const state = await fetchAppState(request.userId);
    return { ...state, recurringGenerated };
  });
}
