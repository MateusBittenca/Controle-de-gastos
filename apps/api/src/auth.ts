import type { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { query } from './db.js';
import type { JwtPayload } from './types.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production';
const COOKIE_NAME = 'fin_token';
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

export const registerSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(reply: FastifyReply, token: string) {
  reply.setCookie(COOKIE_NAME, token, COOKIE_OPTS);
}

export function clearAuthCookie(reply: FastifyReply) {
  reply.clearCookie(COOKIE_NAME, { path: '/' });
}

export function getTokenFromRequest(request: FastifyRequest): string | null {
  const cookie = request.cookies[COOKIE_NAME];
  if (cookie) return cookie;
  const auth = request.headers.authorization;
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (request.method === 'OPTIONS') return;

  const publicPaths = [
    '/api/auth/register',
    '/api/auth/login',
    '/health',
  ];
  const path = request.url.split('?')[0];
  if (publicPaths.some((p) => path === p || path.startsWith(p))) return;

  const token = getTokenFromRequest(request);
  if (!token) {
    return reply.status(401).send({ error: 'Não autenticado' });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return reply.status(401).send({ error: 'Sessão inválida' });
  }
  request.userId = payload.sub;
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const hash = await bcrypt.hash(password, 10);
  const client = await (await import('./db.js')).pool.connect();
  try {
    await client.query('BEGIN');
    const userRes = await client.query(
      `INSERT INTO users (email, name, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, email, name`,
      [email.toLowerCase(), name, hash],
    );
    const user = userRes.rows[0];
    await client.query(
      `INSERT INTO user_preferences (user_id) VALUES ($1)`,
      [user.id],
    );
    await client.query('COMMIT');
    return user as { id: string; email: string; name: string };
  } catch (e: unknown) {
    await client.query('ROLLBACK');
    if ((e as { code?: string }).code === '23505') {
      throw new Error('EMAIL_EXISTS');
    }
    throw e;
  } finally {
    client.release();
  }
}

export async function loginUser(email: string, password: string) {
  const res = await query<{
    id: string;
    email: string;
    name: string;
    password_hash: string | null;
  }>(
    `SELECT id, email, name, password_hash FROM users WHERE email = $1`,
    [email.toLowerCase()],
  );
  const user = res.rows[0];
  if (!user?.password_hash) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  return { id: user.id, email: user.email, name: user.name };
}

export async function hashPin(pin: string) {
  return bcrypt.hash(pin, 10);
}

export async function verifyPin(hash: string | null, pin: string) {
  if (!hash) return false;
  return bcrypt.compare(pin, hash);
}
