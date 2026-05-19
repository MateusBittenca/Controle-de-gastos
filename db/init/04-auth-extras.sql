-- is_recurring na transação (tag "fixo" no front)
ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN NOT NULL DEFAULT FALSE;
