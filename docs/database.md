# Banco de dados SQL (PostgreSQL + Docker)

O app em `index.html` hoje usa **localStorage**. Este diretório prepara a camada **SQL** para quando existir um backend (API) conectando front e banco.

## Stack

| Item | Escolha |
|------|---------|
| SGBD | **PostgreSQL 16** |
| Container | Docker Compose |
| Scripts | `db/init/*.sql` (rodam na primeira subida) |

## Subir o banco

```bash
# Na raiz do projeto
cp .env.example .env
docker compose up -d
```

Verificar saúde:

```bash
docker compose ps
docker compose logs db
```

## Adminer (opcional)

Interface web em http://localhost:8080

```bash
docker compose --profile tools up -d
```

- **Sistema:** PostgreSQL  
- **Servidor:** `db`  
- **Usuário / Senha / Base:** valores do `.env` (padrão `financas` / `financas_dev` / `financas`)

## Conectar via terminal

```bash
docker compose exec db psql -U financas -d financas
```

Exemplos:

```sql
SELECT * FROM users;
SELECT type, description, amount, transaction_date
FROM transactions
ORDER BY transaction_date DESC
LIMIT 10;
```

## Modelo (resumo)

```
users ──┬── user_preferences
        ├── transactions ──► categories
        ├── budgets ───────► categories
        ├── goals
        └── recurring ─────► categories
```

- **`users`**: conta (email, nome, salário, moeda, streak…)
- **`categories`**: catálogo fixo (salário, moradia, etc.)
- **`transactions`**: lançamentos com data e valor
- **`budgets`**: limite por categoria (PK composta `user_id + category_id`)
- **`goals`**: metas financeiras
- **`recurring`**: despesas/receitas recorrentes

Usuário demo do seed: `mateus@email.com` (id fixo no `03-seed.sql`).

## Resetar dados

```bash
docker compose down -v   # apaga o volume (dados)
docker compose up -d     # recria schema + seed
```

## Próximo passo: ligar ao front

1. API (ex.: **Node + Fastify/Express** ou **Python + FastAPI**) lendo `DATABASE_URL`
2. Endpoints REST, ex.:
   - `GET /api/transactions`
   - `POST /api/transactions`
   - `GET /api/budgets`, `GET /api/goals`, …
3. No front: trocar `save()` / `load()` do `localStorage` por `fetch('/api/...')`
4. **TypeScript** no backend com tipos espelhando as tabelas (ou **Prisma** / **Drizzle** a partir do schema)

## Por que PostgreSQL e não só SQLite?

- Melhor para **múltiplos usuários**, concorrência e deploy em produção
- Tipos ricos (`ENUM`, `UUID`, `NUMERIC` para dinheiro)
- Mesmo SQL em Docker local e em cloud (RDS, Supabase, Neon, etc.)

Para protótipo offline único, SQLite também serve; PostgreSQL é o padrão mais comum em apps profissionais.
