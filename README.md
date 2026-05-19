# Finanças

App de finanças pessoais com front **Vite + TypeScript**, API **Fastify** e **PostgreSQL** (Docker).

## Pré-requisitos

- Node.js 20+
- Docker Desktop

## Início rápido

```bash
# 1. Banco de dados
cp .env.example .env
docker compose up -d

# Se o volume já existia antes das migrations novas, recrie:
# docker compose down -v && docker compose up -d

# 2. Dependências
npm install

# 3. API (terminal 1)
npm run dev:api

# 4. Front (terminal 2)
npm run dev:web
```

- **Front:** http://localhost:5173  
- **API:** http://localhost:3000/health  

## Recorrentes automáticas

Ao abrir o app (carregar `/api/state`), o sistema verifica recorrentes com **próximo vencimento ≤ hoje**, cria a transação correspondente e avança a data (semanal, mensal ou anual). Se você ficar meses sem abrir o app, as parcelas em atraso são geradas de uma vez.

## Conta demo

| Campo | Valor |
|-------|--------|
| E-mail | `mateus@email.com` |
| Senha | `demo1234` |

## Estrutura

```
apps/api/     # Fastify + JWT + PostgreSQL
apps/web/     # Vite, mesmo design do protótipo
db/init/      # Schema e seed SQL
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev:api` | API em modo desenvolvimento |
| `npm run dev:web` | Front com proxy `/api` → :3000 |
| `docker compose --profile tools up -d` | Adminer em :8080 |

## Variáveis (.env)

Ver [.env.example](.env.example): `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `API_PORT`.

## Documentação do banco

[docs/database.md](docs/database.md)
