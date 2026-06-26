export type TxnType = 'income' | 'expense';
export type RecurFreq = 'weekly' | 'monthly' | 'yearly';
export type Currency = 'BRL' | 'USD' | 'EUR' | 'GBP';

export interface Transaction {
  id: string;
  type: TxnType;
  cat: string;
  desc: string;
  amt: number;
  date: string;
  isRecur?: boolean;
}

export interface Goal {
  id: string;
  name: string;
  icon: string;
  target: number;
  current: number;
}

export interface Recurring {
  id: string;
  type: TxnType;
  cat: string;
  desc: string;
  amt: number;
  freq: RecurFreq;
  next: string;
}

export interface Profile {
  name: string;
  email: string;
  salary: number;
  currency: Currency;
  pin: string;
  avatarSrc?: string;
  prefs: {
    budgetAlert: boolean;
    goalAlert: boolean;
    hideValues: boolean;
  };
}

export interface BankBalance {
  amount: number | null;
  date: string | null;
  updatedAt: string | null;
}

export interface AppState {
  transactions: Transaction[];
  budgets: Record<string, number>;
  goals: Goal[];
  recurring: Recurring[];
  profile: Profile;
  streakDays: number;
  bankBalance: BankBalance;
  expectedBalance: number | null;
  difference: number | null;
}
