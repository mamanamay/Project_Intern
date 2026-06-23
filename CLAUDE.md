# CLAUDE.md — Project Intelligence

This file is the single source of truth for Claude (and any developer) working on this codebase.
Read this before touching any file.

---

## Project Overview

**Name:** webapp  
**Stack:** Next.js 14 · NestJS · PostgreSQL · Redis · Nginx · Docker  
**Pattern:** Monorepo (frontend + backend in one repo, orchestrated via Docker Compose)

---

## Repo Structure

```
webapp/
├── frontend/          # Next.js 14 (App Router)
├── backend/           # NestJS REST API
├── nginx/             # Reverse proxy config
├── docs/              # Architecture, ADRs, API specs
├── .github/workflows/ # CI/CD pipelines
├── docker-compose.yml        # Production
├── docker-compose.dev.yml    # Development (hot-reload)
├── .env.example
└── CLAUDE.md          ← you are here
```

---

## Architecture

```
Browser → Nginx :80/:443
              ├── /api/*   → backend:3001 (NestJS)
              └── /*       → frontend:3000 (Next.js)

backend → PostgreSQL :5432
backend → Redis       :6379
```

All services communicate on the internal Docker network `app-network`.  
Nginx is the **only** public-facing entry point.

---

## Environment Variables

Copy `.env.example` → `.env` before running anything.

| Variable | Used By | Description |
|---|---|---|
| `NODE_ENV` | both | `development` / `production` |
| `DATABASE_URL` | backend | PostgreSQL connection string |
| `REDIS_URL` | backend | Redis connection string |
| `JWT_SECRET` | backend | JWT signing secret (min 32 chars) |
| `NEXT_PUBLIC_API_URL` | frontend | API base URL seen by the browser |
| `POSTGRES_USER` | postgres | DB user |
| `POSTGRES_PASSWORD` | postgres | DB password |
| `POSTGRES_DB` | postgres | DB name |

---

## Commands

### Development (hot-reload)
```bash
docker compose -f docker-compose.dev.yml up
```

### Production
```bash
docker compose up -d --build
```

### Run backend only (local)
```bash
cd backend && npm install && npm run start:dev
```

### Run frontend only (local)
```bash
cd frontend && npm install && npm run dev
```

### Database migrations
```bash
docker compose exec backend npm run migration:run
```

---

## Coding Conventions

### Backend (NestJS)
- Feature-based module structure: `src/modules/<feature>/`
- Each module has: `controller`, `service`, `dto`, `entity`, `module`
- DTOs use `class-validator` decorators
- All endpoints require JWT guard unless decorated `@Public()`
- Use `ConfigService` — never `process.env` directly
- Errors throw standard NestJS `HttpException` subclasses

### Frontend (Next.js)
- App Router only — no `pages/` directory
- Server Components by default; add `'use client'` only when needed
- API calls go through `src/lib/api.ts` — never `fetch()` inline
- All Thai text uses variable names in English, UI text in Thai
- Tailwind CSS for styling — no inline styles

### General
- Commits follow Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`
- All secrets via environment variables — never hardcoded
- TypeScript strict mode on both sides

---

## Key Files to Know

| File | Purpose |
|---|---|
| `backend/src/app.module.ts` | Root NestJS module |
| `backend/src/config/` | Configuration modules |
| `frontend/src/app/layout.tsx` | Root layout |
| `frontend/src/lib/api.ts` | Centralized API client |
| `nginx/nginx.conf` | Routing rules |
| `docker-compose.yml` | Service orchestration |

---

## Common Pitfalls

1. **CORS** — backend already allows `http://localhost:3000` in dev. For prod, set `ALLOWED_ORIGIN` env.
2. **Migrations** — always run `migration:run` after pulling changes that touch entities.
3. **Redis sessions** — if Redis is down, auth will fail. Check `redis` container first.
4. **Nginx upstream** — service names in `docker-compose.yml` must match `nginx.conf` upstream names exactly.

---

## Adding a New Feature

1. Create `backend/src/modules/<name>/` with module/controller/service/dto/entity
2. Register in `AppModule`
3. Add route to `frontend/src/app/<name>/`
4. Update this file if the architecture changes

