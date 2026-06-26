import type { AppState, BankBalance, FrontGoal, FrontRecurring, FrontTransaction } from './types.js';
import {
  balanceDifference,
  calculateExpectedBalance,
  todayISO,
} from './balance-calculator.js';

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

export function mapBankBalance(row: {
  bank_balance: string | null;
  bank_balance_date: Date | string | null;
  bank_balance_updated_at: Date | string | null;
}): BankBalance {
  const date =
    row.bank_balance_date == null
      ? null
      : row.bank_balance_date instanceof Date
        ? row.bank_balance_date.toISOString().slice(0, 10)
        : String(row.bank_balance_date).slice(0, 10);
  const updatedAt =
    row.bank_balance_updated_at == null
      ? null
      : row.bank_balance_updated_at instanceof Date
        ? row.bank_balance_updated_at.toISOString()
        : String(row.bank_balance_updated_at);
  return {
    amount: row.bank_balance != null ? Number(row.bank_balance) : null,
    date,
    updatedAt,
  };
}

export function computeBalanceMetrics(
  bankBalance: BankBalance,
  transactions: FrontTransaction[],
): { expectedBalance: number | null; difference: number | null } {
  if (bankBalance.amount == null || bankBalance.date == null) {
    return { expectedBalance: null, difference: null };
  }
  const expected = calculateExpectedBalance(
    { anchorAmount: bankBalance.amount, anchorDate: bankBalance.date },
    transactions,
    todayISO(),
  );
  return {
    expectedBalance: expected,
    difference: balanceDifference(bankBalance.amount, expected),
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
    bank_balance: string | null;
    bank_balance_date: Date | string | null;
    bank_balance_updated_at: Date | string | null;
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
  const bankBalance = mapBankBalance(parts.user);
  const { expectedBalance, difference } = computeBalanceMetrics(
    bankBalance,
    parts.transactions,
  );

  return {
    transactions: parts.transactions,
    budgets: parts.budgets,
    goals: parts.goals,
    recurring: parts.recurring,
    streakDays: parts.user.streak_days,
    bankBalance,
    expectedBalance,
    difference,
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
