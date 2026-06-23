# Architecture Overview

## Request Flow

```
Client Browser
      │
      ▼
  Nginx :80
      │
      ├──────────────────────────────┐
      │  /api/*                      │  /*
      ▼                              ▼
  NestJS :3001               Next.js :3000
      │
      ├──────────────────────────────┐
      │                              │
      ▼                              ▼
PostgreSQL :5432             Redis :6379
```

## Services

| Service   | Image/Build       | Port (internal) | Exposed |
|-----------|-------------------|-----------------|---------|
| nginx     | nginx:1.25-alpine | 80              | 80      |
| frontend  | ./frontend        | 3000            | -       |
| backend   | ./backend         | 3001            | -       |
| postgres  | postgres:16       | 5432            | dev only|
| redis     | redis:7           | 6379            | dev only|

## Auth Flow

1. POST /api/auth/login → NestJS validates → returns JWT
2. Frontend stores JWT (memory / httpOnly cookie)
3. Requests include Authorization: Bearer token
4. JwtAuthGuard validates on protected routes
