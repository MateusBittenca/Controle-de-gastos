import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { query } from './db.js';

const TOKEN_BYTES = 32;
const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hora

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function appUrl() {
  return (process.env.APP_URL ?? 'http://localhost:5173').replace(/\/$/, '');
}

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM);
}

async function sendResetEmail(to: string, resetUrl: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: 'Redefinir senha — Finanças',
    text: `Você solicitou a redefinição de senha.\n\nAbra o link abaixo (válido por 1 hora):\n${resetUrl}\n\nSe não foi você, ignore este e-mail.`,
    html: `
      <p>Você solicitou a redefinição de senha no <strong>Finanças</strong>.</p>
      <p><a href="${resetUrl}">Redefinir minha senha</a></p>
      <p style="color:#666;font-size:13px">O link expira em 1 hora. Se não foi você, ignore este e-mail.</p>
    `,
  });
}

/** Solicita reset; retorna URL só em desenvolvimento sem SMTP (para testes locais). */
export async function requestPasswordReset(
  email: string,
): Promise<{ devResetUrl?: string }> {
  const normalized = email.toLowerCase().trim();
  const userRes = await query<{ id: string; email: string }>(
    `SELECT id, email FROM users WHERE email = $1`,
    [normalized],
  );
  const user = userRes.rows[0];

  // Resposta genérica — não revelar se o e-mail existe
  if (!user) return {};

  const token = crypto.randomBytes(TOKEN_BYTES).toString('hex');
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

  await query(
    `UPDATE password_reset_tokens SET used_at = NOW()
     WHERE user_id = $1 AND used_at IS NULL`,
    [user.id],
  );

  await query(
    `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [user.id, tokenHash, expiresAt],
  );

  const resetUrl = `${appUrl()}/?reset=${token}`;

  if (smtpConfigured()) {
    await sendResetEmail(user.email, resetUrl);
    return {};
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('\n[Finanças] Link de recuperação de senha (dev):\n', resetUrl, '\n');
    return { devResetUrl: resetUrl };
  }

  console.warn(
    '[Finanças] SMTP não configurado — e-mail de recuperação não enviado.',
  );
  return {};
}

export async function resetPasswordWithToken(
  token: string,
  newPassword: string,
): Promise<boolean> {
  const tokenHash = hashToken(token);
  const res = await query<{ user_id: string; id: string }>(
    `SELECT user_id, id FROM password_reset_tokens
     WHERE token_hash = $1 AND used_at IS NULL AND expires_at > NOW()`,
    [tokenHash],
  );
  const row = res.rows[0];
  if (!row) return false;

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await query(
    `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
    [passwordHash, row.user_id],
  );
  await query(
    `UPDATE password_reset_tokens SET used_at = NOW() WHERE id = $1`,
    [row.id],
  );
  return true;
}
