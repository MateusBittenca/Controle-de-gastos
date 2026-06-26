-- Saldo bancário manual (âncora de conferência com o banco)

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS bank_balance NUMERIC(14, 2),
  ADD COLUMN IF NOT EXISTS bank_balance_date DATE,
  ADD COLUMN IF NOT EXISTS bank_balance_updated_at TIMESTAMPTZ;
