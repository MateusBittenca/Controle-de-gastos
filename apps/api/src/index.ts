import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '../../.env') });
config({ path: resolve(process.cwd(), '.env') });
import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import { authMiddleware } from './auth.js';
import { pool } from './db.js';
import { authRoutes } from './routes/auth.js';
import { resourceRoutes } from './routes/resources.js';

const PORT = Number(process.env.API_PORT ?? 3000);
const HOST = process.env.API_HOST ?? '0.0.0.0';

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  credentials: true,
});

await app.register(cookie);

app.addHook('preHandler', authMiddleware);

app.get('/health', async () => {
  await pool.query('SELECT 1');
  return { ok: true };
});

await app.register(authRoutes);
await app.register(resourceRoutes);

try {
  await app.listen({ port: PORT, host: HOST });
  console.log(`API rodando em http://localhost:${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
