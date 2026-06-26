import type { NubankTransaction } from './nubank-types.js';

export interface MappedNubankFields {
  suggestedType: 'income' | 'expense';
  suggestedCat: string;
  suggestedAmt: number;
}

const EXPENSE_RULES: [RegExp, string][] = [
  [/ifood|rappi|restaurante|mercado|supermercado|padaria/i, 'food'],
  [/uber|99\s|taxi|metro|onibus|combustivel|posto/i, 'transport'],
  [/netflix|spotify|cinema|steam|disney/i, 'leisure'],
  [/farmacia|hospital|clinica|drogaria|saude/i, 'health'],
  [/aluguel|condominio|iptu/i, 'housing'],
  [/curso|udemy|faculdade|escola|educacao/i, 'education'],
  [/luz|agua|internet|telefone|energia|vivo|claro|tim/i, 'utilities'],
];

const INCOME_RULES: [RegExp, string][] = [
  [/rendimento/i, 'invest'],
  [/pix\s+recebido|transferencia\s+recebida|deposito|salario/i, 'other_in'],
  [/freelance|pj|honorario/i, 'freelance'],
];

export function suggestCategory(description: string, type: 'income' | 'expense'): string {
  const rules = type === 'income' ? INCOME_RULES : EXPENSE_RULES;
  for (const [pattern, cat] of rules) {
    if (pattern.test(description)) return cat;
  }
  return type === 'income' ? 'other_in' : 'other_ex';
}

export function mapNubankTransaction(txn: NubankTransaction): MappedNubankFields | null {
  if (txn.amount === 0) return null;

  const suggestedType: 'income' | 'expense' = txn.amount < 0 ? 'expense' : 'income';
  const suggestedAmt = Math.abs(txn.amount);
  const suggestedCat = suggestCategory(txn.description, suggestedType);

  return { suggestedType, suggestedCat, suggestedAmt };
}
