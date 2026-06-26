export interface NubankTransaction {
  date: string;
  description: string;
  amount: number;
}

export type NubankStatementType = 'credit_card' | 'account';

export interface NubankStatement {
  type: NubankStatementType;
  transactions: NubankTransaction[];
  importedAt: Date;
}

export type ReconcileStatus =
  | 'missing'
  | 'matched'
  | 'ignored'
  | 'recurring';

export interface ReconcileRow {
  nubank: NubankTransaction;
  status: ReconcileStatus;
  matchedTransactionId?: string;
  matchedRecurringId?: string;
  suggestedType: 'income' | 'expense';
  suggestedCat: string;
  suggestedAmt: number;
  selected: boolean;
  ignoreReason?: string;
}

export interface BulkImportRow {
  type: string;
  cat: string;
  desc: string;
  amt: number;
  date: string;
}
