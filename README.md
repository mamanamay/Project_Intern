# Web App

**Next.js 14 + NestJS + PostgreSQL + Redis + Nginx + Docker**

## Quick Start

### 1. Clone & configure

```bash
cp .env.example .env
# แก้ไข .env ตามสภาพแวดล้อม
```

### 2. Development (hot-reload)

```bash
docker compose -f docker-compose.dev.yml up
```

| Service   | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost           |
| API       | http://localhost/api       |
| Health    | http://localhost/api/health|

### 3. Production

```bash
docker compose up -d --build
```

## Project Structure

```
webapp/
├── frontend/                    # Next.js 14 (App Router)
│   ├── src/
│   │   ├── app/                 # Pages & layouts
│   │   ├── lib/api.ts           # Centralized API client
│   │   ├── components/          # Shared components
│   │   └── types/               # TypeScript types
│   ├── Dockerfile               # Production (standalone)
│   └── Dockerfile.dev           # Development (hot-reload)
│
├── backend/                     # NestJS REST API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/            # JWT auth (login/register)
│   │   │   ├── users/           # User entity + service
│   │   │   └── health/          # Health check endpoint
│   │   └── main.ts
│   ├── Dockerfile
│   └── Dockerfile.dev
│
├── nginx/
│   └── nginx.conf               # Reverse proxy config
│
├── docs/
│   └── architecture.md          # System design
│
├── .github/workflows/ci.yml     # GitHub Actions CI
├── docker-compose.yml           # Production
├── docker-compose.dev.yml       # Development
├── .env.example                 # Environment template
├── CLAUDE.md                    # AI context file
└── README.md
```

## API Endpoints

| Method | Path              | Auth | Description     |
|--------|-------------------|------|-----------------|
| POST   | /api/auth/register| -    | Register user   |
| POST   | /api/auth/login   | -    | Login → JWT     |
| GET    | /api/health       | -    | Health check    |

## Commit Convention

```
feat:   new feature
fix:    bug fix
docs:   documentation
chore:  tooling / config
refactor: code restructure
test:   tests
```
