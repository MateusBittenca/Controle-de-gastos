-- Finanças — schema PostgreSQL
-- Executado automaticamente na primeira subida do container

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Tipos ──────────────────────────────────────────────
CREATE TYPE transaction_type AS ENUM ('income', 'expense');
CREATE TYPE recurrence_frequency AS ENUM ('weekly', 'monthly', 'yearly');

-- ── Usuários (multi-conta no futuro) ───────────────────
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) NOT NULL UNIQUE,
  name          VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),
  salary        NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (salary >= 0),
  currency      CHAR(3) NOT NULL DEFAULT 'BRL'
    CHECK (currency IN ('BRL', 'USD', 'EUR', 'GBP')),
  pin_hash      VARCHAR(255),
  avatar_url    TEXT,
  streak_days   INTEGER NOT NULL DEFAULT 0 CHECK (streak_days >= 0),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_preferences (
  user_id      UUID PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  budget_alert BOOLEAN NOT NULL DEFAULT TRUE,
  goal_alert   BOOLEAN NOT NULL DEFAULT FALSE,
  hide_values  BOOLEAN NOT NULL DEFAULT FALSE,
  theme        VARCHAR(10) NOT NULL DEFAULT 'light'
    CHECK (theme IN ('light', 'dark'))
);

-- ── Categorias (catálogo fixo, igual ao front) ─────────
CREATE TABLE categories (
  id       VARCHAR(50) PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  type     transaction_type NOT NULL,
  icon     VARCHAR(50) NOT NULL,
  color    VARCHAR(7) NOT NULL,
  bg_color VARCHAR(7) NOT NULL
);

-- ── Transações ─────────────────────────────────────────
CREATE TABLE transactions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  type             transaction_type NOT NULL,
  category_id      VARCHAR(50) NOT NULL REFERENCES categories (id),
  description      VARCHAR(500) NOT NULL,
  amount           NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
  transaction_date DATE NOT NULL,
  is_recurring     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_transactions_user_date
  ON transactions (user_id, transaction_date DESC);

CREATE INDEX idx_transactions_user_type
  ON transactions (user_id, type);

-- ── Orçamento por categoria ────────────────────────────
CREATE TABLE budgets (
  user_id      UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  category_id  VARCHAR(50) NOT NULL REFERENCES categories (id),
  limit_amount NUMERIC(14, 2) NOT NULL CHECK (limit_amount > 0),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, category_id)
);

-- ── Metas ──────────────────────────────────────────────
CREATE TABLE goals (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  name           VARCHAR(255) NOT NULL,
  icon           VARCHAR(50) NOT NULL DEFAULT 'star',
  target_amount  NUMERIC(14, 2) NOT NULL CHECK (target_amount > 0),
  current_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (current_amount >= 0),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_goals_user ON goals (user_id);

-- ── Recorrentes ────────────────────────────────────────
CREATE TABLE recurring (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  type        transaction_type NOT NULL,
  category_id VARCHAR(50) NOT NULL REFERENCES categories (id),
  description VARCHAR(500) NOT NULL,
  amount      NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
  frequency   recurrence_frequency NOT NULL DEFAULT 'monthly',
  next_date   DATE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_recurring_user_next ON recurring (user_id, next_date);

-- ── updated_at automático ──────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_transactions_updated
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_budgets_updated
  BEFORE UPDATE ON budgets
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_goals_updated
  BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_recurring_updated
  BEFORE UPDATE ON recurring
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
