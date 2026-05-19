-- Categorias padrão (espelham CATS do index.html)

INSERT INTO categories (id, name, type, icon, color, bg_color) VALUES
  ('salary',    'Salário',       'income',  'salary',    '#2D6A4F', '#E8F5EF'),
  ('freelance', 'Freelance',     'income',  'freelance', '#1A4A7A', '#E8F0FA'),
  ('invest',    'Investimentos', 'income',  'invest',    '#8B5E00', '#FFF3D6'),
  ('other_in',  'Outros',        'income',  'other_in',  '#2D6A4F', '#E8F5EF'),
  ('housing',   'Moradia',       'expense', 'housing',   '#1A1916', '#F0EFEB'),
  ('food',      'Alimentação',   'expense', 'food',      '#6B6560', '#EFEDE8'),
  ('transport', 'Transporte',    'expense', 'transport', '#1A4A7A', '#E8F0FA'),
  ('health',    'Saúde',         'expense', 'health',    '#9B2335', '#F9ECEE'),
  ('leisure',   'Lazer',         'expense', 'leisure',   '#2D6A4F', '#E8F5EF'),
  ('education', 'Educação',      'expense', 'education', '#8B5E00', '#FFF3D6'),
  ('utilities', 'Utilidades',    'expense', 'utilities', '#8B5E00', '#FFF3D6'),
  ('other_ex',  'Outros',        'expense', 'other_ex',  '#6B6560', '#EFEDE8');
