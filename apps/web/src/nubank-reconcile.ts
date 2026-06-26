import type { Recurring, Transaction } from './types.js';
import { mapNubankTransaction } from './nubank-mapper.js';
import type {
  BulkImportRow,
  NubankStatement,
  ReconcileRow,
  ReconcileStatus,
} from './nubank-types.js';

const DATE_TOLERANCE_DAYS = 3;
const AMOUNT_TOLERANCE = 0.01;

export function normalizeDesc(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\*/g, ' ')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeAmount(a: number): number {
  return Math.round(a * 100) / 100;
}

function daysDiff(d1: string, d2: string): number {
  const a = new Date(d1 + 'T12:00:00');
  const b = new Date(d2 + 'T12:00:00');
  return Math.abs(Math.round((a.getTime() - b.getTime()) / 86_400_000));
}

function amountsEqual(a: number, b: number): boolean {
  return Math.abs(normalizeAmount(a) - normalizeAmount(b)) <= AMOUNT_TOLERANCE;
}

function descOverlap(a: string, b: string): boolean {
  const na = normalizeDesc(a);
  const nb = normalizeDesc(b);
  if (!na || !nb) return false;
  if (na.includes(nb) || nb.includes(na)) return true;

  const wordsA = na.split(' ').filter((w) => w.length >= 4);
  const wordsB = new Set(nb.split(' ').filter((w) => w.length >= 4));
  return wordsA.some((w) => wordsB.has(w));
}

function descPartiallySimilar(a: string, b: string): boolean {
  return descOverlap(a, b);
}

function shouldIgnore(
  description: string,
  statementType: NubankStatement['type'],
): { ignore: boolean; reason?: string } {
  if (statementType === 'credit_card' && /PAGAMENTO\s+EM/i.test(description)) {
    return {
      ignore: true,
      reason: 'Pagamento de fatura do cartão — não é despesa operacional.',
    };
  }

  if (statementType === 'account') {
    const norm = normalizeDesc(description);
    if (
      /pagamento/.test(norm) &&
      (/fatura|cartao de credito|cartao/.test(norm) || /nu\s*pay|nubank/.test(norm))
    ) {
      return {
        ignore: true,
        reason:
          'Possível pagamento de fatura. Se você já lançou os gastos do cartão, importar isso causaria contagem dupla.',
      };
    }
  }

  return { ignore: false };
}

function matchesTransaction(
  nubankDesc: string,
  nubankDate: string,
  nubankAmt: number,
  nubankType: 'income' | 'expense',
  nubankCat: string,
  existing: Transaction,
): boolean {
  if (existing.type !== nubankType) return false;
  if (!amountsEqual(existing.amt, nubankAmt)) return false;
  if (daysDiff(existing.date, nubankDate) > DATE_TOLERANCE_DAYS) return false;

  if (descOverlap(nubankDesc, existing.desc)) return true;

  return (
    existing.cat === nubankCat && descPartiallySimilar(nubankDesc, existing.desc)
  );
}

function matchesRecurring(
  nubankDesc: string,
  nubankAmt: number,
  nubankType: 'income' | 'expense',
  recurring: Recurring,
): boolean {
  if (recurring.type !== nubankType) return false;
  if (!amountsEqual(recurring.amt, nubankAmt)) return false;
  return descPartiallySimilar(nubankDesc, recurring.desc);
}

function matchesRecurringTransaction(
  nubankDate: string,
  nubankAmt: number,
  nubankType: 'income' | 'expense',
  existing: Transaction,
): boolean {
  if (!existing.isRecur) return false;
  if (existing.type !== nubankType) return false;
  if (!amountsEqual(existing.amt, nubankAmt)) return false;
  return daysDiff(existing.date, nubankDate) <= DATE_TOLERANCE_DAYS;
}

function buildRow(
  nubank: NubankStatement['transactions'][0],
  status: ReconcileStatus,
  mapped: NonNullable<ReturnType<typeof mapNubankTransaction>>,
  opts: {
    selected: boolean;
    matchedTransactionId?: string;
    matchedRecurringId?: string;
    ignoreReason?: string;
  },
): ReconcileRow {
  return {
    nubank,
    status,
    suggestedType: mapped.suggestedType,
    suggestedCat: mapped.suggestedCat,
    suggestedAmt: mapped.suggestedAmt,
    selected: opts.selected,
    matchedTransactionId: opts.matchedTransactionId,
    matchedRecurringId: opts.matchedRecurringId,
    ignoreReason: opts.ignoreReason,
  };
}

export function reconcileNubankStatement(
  statement: NubankStatement,
  existingTransactions: Transaction[],
  recurring: Recurring[],
): ReconcileRow[] {
  const rows: ReconcileRow[] = [];

  for (const nubank of statement.transactions) {
    const mapped = mapNubankTransaction(nubank);
    if (!mapped) continue;

    const { ignore, reason } = shouldIgnore(nubank.description, statement.type);
    if (ignore) {
      rows.push(
        buildRow(nubank, 'ignored', mapped, {
          selected: false,
          ignoreReason: reason,
        }),
      );
      continue;
    }

    const recurHit = recurring.find((r) =>
      matchesRecurring(
        nubank.description,
        mapped.suggestedAmt,
        mapped.suggestedType,
        r,
      ),
    );

    if (recurHit) {
      rows.push(
        buildRow(nubank, 'recurring', mapped, {
          selected: false,
          matchedRecurringId: recurHit.id,
        }),
      );
      continue;
    }

    const recurTxnHit = existingTransactions.find((t) =>
      matchesRecurringTransaction(
        nubank.date,
        mapped.suggestedAmt,
        mapped.suggestedType,
        t,
      ),
    );

    if (recurTxnHit) {
      rows.push(
        buildRow(nubank, 'recurring', mapped, {
          selected: false,
          matchedTransactionId: recurTxnHit.id,
        }),
      );
      continue;
    }

    const txnHit = existingTransactions.find((t) =>
      matchesTransaction(
        nubank.description,
        nubank.date,
        mapped.suggestedAmt,
        mapped.suggestedType,
        mapped.suggestedCat,
        t,
      ),
    );

    if (txnHit) {
      rows.push(
        buildRow(nubank, 'matched', mapped, {
          selected: false,
          matchedTransactionId: txnHit.id,
        }),
      );
      continue;
    }

    rows.push(buildRow(nubank, 'missing', mapped, { selected: true }));
  }

  return rows;
}

export function reconcileRowsToBulkImport(rows: ReconcileRow[]): BulkImportRow[] {
  return rows
    .filter((r) => r.selected && r.status === 'missing')
    .map((r) => ({
      type: r.suggestedType,
      cat: r.suggestedCat,
      desc: r.nubank.description,
      amt: r.suggestedAmt,
      date: r.nubank.date,
    }));
}

export function reconcileSummary(rows: ReconcileRow[]) {
  return {
    missing: rows.filter((r) => r.status === 'missing').length,
    matched: rows.filter((r) => r.status === 'matched').length,
    recurring: rows.filter((r) => r.status === 'recurring').length,
    ignored: rows.filter((r) => r.status === 'ignored').length,
    selected: rows.filter((r) => r.selected).length,
  };
}
