import type { AppState, FrontGoal, FrontRecurring, FrontTransaction } from './types.js';

export function mapTransaction(row: {
  id: string;
  type: string;
  category_id: string;
  description: string;
  amount: string;
  transaction_date: Date | string;
  is_recurring?: boolean;
}): FrontTransaction {
  const d =
    row.transaction_date instanceof Date
      ? row.transaction_date.toISOString().slice(0, 10)
      : String(row.transaction_date).slice(0, 10);
  return {
    id: row.id,
    type: row.type as FrontTransaction['type'],
    cat: row.category_id,
    desc: row.description,
    amt: Number(row.amount),
    date: d,
    ...(row.is_recurring ? { isRecur: true } : {}),
  };
}

export function mapGoal(row: {
  id: string;
  name: string;
  icon: string;
  target_amount: string;
  current_amount: string;
}): FrontGoal {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon,
    target: Number(row.target_amount),
    current: Number(row.current_amount),
  };
}

export function mapRecurring(row: {
  id: string;
  type: string;
  category_id: string;
  description: string;
  amount: string;
  frequency: string;
  next_date: Date | string;
}): FrontRecurring {
  const next =
    row.next_date instanceof Date
      ? row.next_date.toISOString().slice(0, 10)
      : String(row.next_date).slice(0, 10);
  return {
    id: row.id,
    type: row.type as FrontRecurring['type'],
    cat: row.category_id,
    desc: row.description,
    amt: Number(row.amount),
    freq: row.frequency as FrontRecurring['freq'],
    next,
  };
}

export function buildAppState(parts: {
  user: {
    name: string;
    email: string;
    salary: string;
    currency: string;
    streak_days: number;
    avatar_url: string | null;
    pin_hash: string | null;
  };
  prefs: {
    budget_alert: boolean;
    goal_alert: boolean;
    hide_values: boolean;
    theme: string;
  };
  transactions: FrontTransaction[];
  budgets: Record<string, number>;
  goals: FrontGoal[];
  recurring: FrontRecurring[];
}): AppState {
  return {
    transactions: parts.transactions,
    budgets: parts.budgets,
    goals: parts.goals,
    recurring: parts.recurring,
    streakDays: parts.user.streak_days,
    profile: {
      name: parts.user.name,
      email: parts.user.email,
      salary: Number(parts.user.salary),
      currency: parts.user.currency as AppState['profile']['currency'],
      pin: parts.user.pin_hash ? '****' : '',
      ...(parts.user.avatar_url ? { avatarSrc: parts.user.avatar_url } : {}),
      prefs: {
        budgetAlert: parts.prefs.budget_alert,
        goalAlert: parts.prefs.goal_alert,
        hideValues: parts.prefs.hide_values,
      },
    },
  };
}
