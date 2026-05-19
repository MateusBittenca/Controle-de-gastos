export type TxnType = 'income' | 'expense';
export type RecurFreq = 'weekly' | 'monthly' | 'yearly';
export type Currency = 'BRL' | 'USD' | 'EUR' | 'GBP';

export interface FrontTransaction {
  id: string;
  type: TxnType;
  cat: string;
  desc: string;
  amt: number;
  date: string;
  isRecur?: boolean;
}

export interface FrontGoal {
  id: string;
  name: string;
  icon: string;
  target: number;
  current: number;
}

export interface FrontRecurring {
  id: string;
  type: TxnType;
  cat: string;
  desc: string;
  amt: number;
  freq: RecurFreq;
  next: string;
}

export interface FrontProfile {
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

export interface AppState {
  transactions: FrontTransaction[];
  budgets: Record<string, number>;
  goals: FrontGoal[];
  recurring: FrontRecurring[];
  profile: FrontProfile;
  streakDays: number;
}

export interface JwtPayload {
  sub: string;
  email: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}
