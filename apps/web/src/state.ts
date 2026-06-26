import type { AppState } from './types.js';

const emptyProfile = {
  name: '',
  email: '',
  salary: 0,
  currency: 'BRL' as const,
  pin: '',
  prefs: { budgetAlert: true, goalAlert: false, hideValues: false },
};

export const DB: AppState = {
  transactions: [],
  budgets: {},
  goals: [],
  recurring: [],
  profile: { ...emptyProfile },
  streakDays: 0,
  bankBalance: { amount: null, date: null, updatedAt: null },
  expectedBalance: null,
  difference: null,
};

export function setDB(state: AppState) {
  DB.transactions = state.transactions;
  DB.budgets = state.budgets;
  DB.goals = state.goals;
  DB.recurring = state.recurring;
  DB.profile = state.profile;
  DB.streakDays = state.streakDays;
  DB.bankBalance = state.bankBalance ?? { amount: null, date: null, updatedAt: null };
  DB.expectedBalance = state.expectedBalance ?? null;
  DB.difference = state.difference ?? null;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
