import type { NubankStatement, NubankStatementType, NubankTransaction } from './nubank-types.js';

/** Parser CSV simples compatível com aspas e vírgulas na descrição */
function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
      row.push(field);
      if (row.some((c) => c.trim())) rows.push(row);
      row = [];
      field = '';
      if (ch === '\r') i++;
    } else if (ch !== '\r') {
      field += ch;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some((c) => c.trim())) rows.push(row);
  }

  return rows;
}

function normalizeHeader(h: string): string {
  return h
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function isValidDate(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

/** Heurística quando o tipo não é informado pelo usuário */
export function detectNubankStatementType(
  transactions: NubankTransaction[],
): NubankStatementType {
  let cardSignals = 0;
  let accountSignals = 0;

  for (const t of transactions) {
    const d = t.description.toLowerCase();
    if (/pagamento\s+em/i.test(d)) cardSignals += 2;
    if (/pix\s+recebido|transferencia\s+recebida|rendimento\s+conta/i.test(d)) {
      accountSignals += 2;
    }
    if (/\*/.test(t.description)) cardSignals++;
  }

  return cardSignals >= accountSignals ? 'credit_card' : 'account';
}

export function parseNubankCsv(
  csvText: string,
  type: NubankStatementType,
): NubankStatement {
  const cleaned = csvText.replace(/^\uFEFF/, '');
  const rows = parseCsvRows(cleaned);

  if (rows.length < 2) {
    throw new Error('CSV vazio ou sem dados.');
  }

  const header = rows[0].map(normalizeHeader);
  const dateIdx = header.findIndex((h) => h === 'csvdata' || h === 'data');
  const descIdx = header.findIndex((h) => h === 'descricao' || h === 'description');
  const valIdx = header.findIndex((h) => h === 'valor' || h === 'value');

  if (dateIdx === -1 || descIdx === -1 || valIdx === -1) {
    throw new Error('Cabeçalho inválido. Esperado: csvData,Descrição,Valor');
  }

  const transactions: NubankTransaction[] = [];

  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i];
    if (cols.length < Math.max(dateIdx, descIdx, valIdx) + 1) continue;

    const date = cols[dateIdx].trim();
    const description = cols[descIdx].trim();
    const amount = parseFloat(cols[valIdx].trim().replace(',', '.'));

    if (!isValidDate(date) || !description || Number.isNaN(amount)) continue;
    if (amount === 0) continue;

    transactions.push({ date, description, amount });
  }

  if (!transactions.length) {
    throw new Error('Nenhuma transação válida encontrada no CSV.');
  }

  return { type, transactions, importedAt: new Date() };
}
