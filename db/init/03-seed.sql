-- Dados de demonstração (equivalente ao seed() do front)

INSERT INTO users (id, email, name, password_hash, salary, currency, streak_days)
VALUES (
  'a0000000-0000-4000-8000-000000000001',
  'mateus@email.com',
  'Mateus',
  crypt('demo1234', gen_salt('bf')),
  8000.00,
  'BRL',
  12
);

INSERT INTO user_preferences (user_id, budget_alert, goal_alert, hide_values, theme)
VALUES (
  'a0000000-0000-4000-8000-000000000001',
  TRUE,
  FALSE,
  FALSE,
  'light'
);

-- Orçamentos
INSERT INTO budgets (user_id, category_id, limit_amount) VALUES
  ('a0000000-0000-4000-8000-000000000001', 'housing',   2000),
  ('a0000000-0000-4000-8000-000000000001', 'food',       600),
  ('a0000000-0000-4000-8000-000000000001', 'transport',  300),
  ('a0000000-0000-4000-8000-000000000001', 'health',     200),
  ('a0000000-0000-4000-8000-000000000001', 'leisure',    300),
  ('a0000000-0000-4000-8000-000000000001', 'utilities',  250);

-- Metas
INSERT INTO goals (user_id, name, icon, target_amount, current_amount) VALUES
  ('a0000000-0000-4000-8000-000000000001', 'Fundo de emergência', 'shield', 30000, 20100),
  ('a0000000-0000-4000-8000-000000000001', 'Viagem Europa',       'plane',  15000,  4500),
  ('a0000000-0000-4000-8000-000000000001', 'Notebook novo',       'laptop',  6000,  2200);

-- Recorrentes
INSERT INTO recurring (user_id, type, category_id, description, amount, frequency, next_date) VALUES
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'housing',   'Aluguel',   1800, 'monthly', CURRENT_DATE),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'utilities', 'Energia',    210, 'monthly', CURRENT_DATE),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'leisure',   'Streaming',   45, 'monthly', CURRENT_DATE),
  ('a0000000-0000-4000-8000-000000000001', 'income',  'salary',    'Salário',   8000, 'monthly', CURRENT_DATE);

-- Transações (mês atual e anterior)
INSERT INTO transactions (user_id, type, category_id, description, amount, transaction_date) VALUES
  ('a0000000-0000-4000-8000-000000000001', 'income',  'salary',    'Salário',          8000, DATE_TRUNC('month', CURRENT_DATE)::DATE + 4),
  ('a0000000-0000-4000-8000-000000000001', 'income',  'freelance', 'Projeto UI/UX',    1400, DATE_TRUNC('month', CURRENT_DATE)::DATE + 11),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'housing',   'Aluguel',          1800, DATE_TRUNC('month', CURRENT_DATE)::DATE + 5),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'food',      'Supermercado',      340, DATE_TRUNC('month', CURRENT_DATE)::DATE + 7),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'transport', 'Combustível',       180, DATE_TRUNC('month', CURRENT_DATE)::DATE + 9),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'utilities', 'Energia elétrica',  210, DATE_TRUNC('month', CURRENT_DATE)::DATE + 14),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'leisure',   'Restaurante',        95, DATE_TRUNC('month', CURRENT_DATE)::DATE + 17),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'health',    'Farmácia',           85, DATE_TRUNC('month', CURRENT_DATE)::DATE + 19),
  ('a0000000-0000-4000-8000-000000000001', 'income',  'salary',    'Salário',          8000, (DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month')::DATE + 4),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'housing',   'Aluguel',          1800, (DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month')::DATE + 5),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'food',      'Supermercado',      290, (DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month')::DATE + 8),
  ('a0000000-0000-4000-8000-000000000001', 'expense', 'transport', 'Uber',              140, (DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month')::DATE + 13);
