import { query } from './db.js';
import { buildAppState, mapGoal, mapRecurring, mapTransaction } from './mappers.js';
import type { AppState } from './types.js';

export async function fetchAppState(userId: string): Promise<AppState> {
  const [userRes, txRes, budRes, goalRes, recRes] = await Promise.all([
    query<{
      name: string;
      email: string;
      salary: string;
      currency: string;
      streak_days: number;
      avatar_url: string | null;
      pin_hash: string | null;
      budget_alert: boolean;
      goal_alert: boolean;
      hide_values: boolean;
      theme: string;
    }>(
      `SELECT u.name, u.email, u.salary, u.currency, u.streak_days, u.avatar_url, u.pin_hash,
              p.budget_alert, p.goal_alert, p.hide_values, p.theme
       FROM users u
       JOIN user_preferences p ON p.user_id = u.id
       WHERE u.id = $1`,
      [userId],
    ),
    query<{
      id: string;
      type: string;
      category_id: string;
      description: string;
      amount: string;
      transaction_date: Date | string;
      is_recurring?: boolean;
    }>(
      `SELECT id, type, category_id, description, amount, transaction_date, is_recurring
       FROM transactions WHERE user_id = $1 ORDER BY transaction_date DESC`,
      [userId],
    ),
    query<{ category_id: string; limit_amount: string }>(
      `SELECT category_id, limit_amount FROM budgets WHERE user_id = $1`,
      [userId],
    ),
    query<{
      id: string;
      name: string;
      icon: string;
      target_amount: string;
      current_amount: string;
    }>(
      `SELECT id, name, icon, target_amount, current_amount FROM goals WHERE user_id = $1`,
      [userId],
    ),
    query<{
      id: string;
      type: string;
      category_id: string;
      description: string;
      amount: string;
      frequency: string;
      next_date: Date | string;
    }>(
      `SELECT id, type, category_id, description, amount, frequency, next_date
       FROM recurring WHERE user_id = $1`,
      [userId],
    ),
  ]);

  const user = userRes.rows[0];
  if (!user) throw new Error('USER_NOT_FOUND');

  const budgets: Record<string, number> = {};
  for (const b of budRes.rows) {
    budgets[b.category_id] = Number(b.limit_amount);
  }

  return buildAppState({
    user: {
      name: user.name,
      email: user.email,
      salary: user.salary,
      currency: user.currency,
      streak_days: user.streak_days,
      avatar_url: user.avatar_url,
      pin_hash: user.pin_hash,
    },
    prefs: {
      budget_alert: user.budget_alert,
      goal_alert: user.goal_alert,
      hide_values: user.hide_values,
      theme: user.theme,
    },
    transactions: txRes.rows.map(mapTransaction),
    budgets,
    goals: goalRes.rows.map(mapGoal),
    recurring: recRes.rows.map(mapRecurring),
  });
}

export async function getUserTheme(userId: string) {
  const res = await query<{ theme: string }>(
    `SELECT theme FROM user_preferences WHERE user_id = $1`,
    [userId],
  );
  return res.rows[0]?.theme ?? 'light';
}
