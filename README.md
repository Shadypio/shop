# Shop Platform

Piattaforma e-commerce leggera per negozi locali (M0 — setup iniziale).

## Stack

- **Frontend** (`apps/web`): React + Vite + TypeScript + React Router + TailwindCSS + TanStack Query + Zustand
- **Backend** (`apps/api`): Express + TypeScript + Prisma + PostgreSQL
- **Monorepo**: pnpm workspaces

## Requisiti

- Node.js >= 20
- pnpm >= 9 (`npm install -g pnpm`)
- PostgreSQL (locale o remoto) per l'API

## Setup locale

```bash
pnpm install

# Backend
cp apps/api/.env.example apps/api/.env
# Modifica DATABASE_URL in apps/api/.env con la tua istanza Postgres
pnpm --filter api prisma:generate
pnpm --filter api prisma:migrate   # crea le tabelle (richiede un DB raggiungibile)

# Avvio in sviluppo (due terminali)
pnpm dev:api    # http://localhost:4000
pnpm dev:web    # http://localhost:5173
```

Verifica rapida: `GET http://localhost:4000/api/health` deve rispondere `{ "status": "ok" }`.

## Script principali

| Comando | Descrizione |
|---|---|
| `pnpm build` | Build di tutti i workspace |
| `pnpm --filter api lint` | Lint backend |
| `pnpm --filter api typecheck` | Typecheck backend |
| `pnpm --filter api test` | Test backend (Vitest) |
| `pnpm --filter web build` | Build produzione frontend |

## Struttura

```
apps/web    → frontend pubblico + pannello admin (stesso bundle React)
apps/api    → API REST (Controller → Service → Repository → Prisma)
packages/shared-types → tipi/DTO condivisi tra web e api (popolato quando servirà)
```

## Deploy

- **Frontend**: Vercel, root directory `apps/web` (vedi `apps/web/vercel.json`)
- **Backend**: Render (vedi `render.yaml`) o Railway (autodetect Node/pnpm)

## Stato del progetto

- ✅ M0 — Setup monorepo, CI, schema Prisma iniziale, deploy skeleton
- ⏳ M1 — Catalogo pubblico (categorie, prodotti, immagini)
- ⏳ M2 — Carrello & checkout
- ⏳ M3 — Admin: autenticazione, prodotti, categorie
- ⏳ M4 — Admin: ordini & dashboard
- ⏳ M5 — Hardening & lancio
