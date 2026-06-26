import type { FrontTransaction } from './types.js';

export interface BalanceState {
  anchorAmount: number;
  anchorDate: string;
}

export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Transações com date > anchorDate e date <= asOfDate */
export function calculateExpectedBalance(
  anchor: BalanceState,
  transactions: FrontTransaction[],
  asOfDate: string = todayISO(),
): number {
  let balance = anchor.anchorAmount;

  for (const t of transactions) {
    if (t.date <= anchor.anchorDate || t.date > asOfDate) continue;
    if (t.type === 'income') balance += t.amt;
    else balance -= t.amt;
  }

  return Math.round(balance * 100) / 100;
}

export function balanceDifference(reported: number, expected: number): number {
  return Math.round((reported - expected) * 100) / 100;
}

export function isSignificantDifference(diff: number, expected: number): boolean {
  const abs = Math.abs(diff);
  if (abs <= 0.01) return false;
  if (abs > 50) return true;
  if (expected === 0) return abs > 50;
  return abs / Math.abs(expected) > 0.05;
}
