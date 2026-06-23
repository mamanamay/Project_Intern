# CLAUDE.md — Project Intelligence

ไฟล์นี้เป็น **แหล่งข้อมูลหลัก** สำหรับ AI Assistant และนักพัฒนาที่ต้องการทำความเข้าใจ codebase  
**อ่านไฟล์นี้ก่อนแก้ไขไฟล์ใด ๆ**

---

## ภาพรวมโปรเจกต์

| รายการ | รายละเอียด |
|---|---|
| **ชื่อ** | CV/Portfolio ของ นภัสรวรรณ ชัยบาล (Napatwan Chaiban) |
| **Stack** | SvelteKit 2 · NestJS 10 · PostgreSQL 16 · Redis 7 · Nginx 1.25 · Docker |
| **รูปแบบ** | Monorepo (`frontend/` + `backend/` ใน repo เดียว, orchestrate ด้วย Docker Compose) |
| **ภาษา** | TypeScript ทั้ง frontend และ backend, UI เป็นภาษาไทย |
| **HTTPS** | Self-Signed SSL Certificate (Nginx terminate TLS) |
| **DB สำหรับ Local** | SQLite (ไม่ต้องลง PostgreSQL แยก) |

---

## โครงสร้าง Repository

```
Project_Intern/
├── frontend/                        # SvelteKit 2 + Vite 6 (port 3000 prod / 5173 dev)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── +layout.svelte      # Root layout (Navbar + Footer + slot)
│   │   │   └── +page.svelte        # หน้าหลัก (แสดง CV ทั้งหมด + ปุ่ม Admin)
│   │   ├── lib/
│   │   │   ├── api.ts              # Centralized API client (apiFetch, cvApi, authApi, SSE)
│   │   │   ├── stores/
│   │   │   │   └── cv.ts           # Svelte writable store (cvData, isAdmin, editingField)
│   │   │   └── components/
│   │   │       ├── Navbar.svelte        # แถบเมนูบนสุด (โลโก้ + ลิงก์นำทาง)
│   │   │       ├── ProfileCard.svelte   # ข้อมูลส่วนตัว (ชื่อ, email, โทร, GitHub, LinkedIn)
│   │   │       ├── EducationCard.svelte # ประวัติการศึกษา
│   │   │       ├── CertCard.svelte      # ใบรับรอง (Certifications)
│   │   │       ├── AchievementCard.svelte # ผลงานและรางวัล
│   │   │       ├── SkillsSection.svelte # ทักษะ (Programming + Tools)
│   │   │       ├── ProjectCard.svelte   # โปรเจคที่เคยทำ
│   │   │       ├── EditableText.svelte  # Component สำหรับแก้ไขข้อความ (Admin Mode)
│   │   │       ├── LoadingScreen.svelte # หน้าจอ Loading
│   │   │       └── Footer.svelte        # Footer ด้านล่าง
│   │   ├── app.html                # HTML shell (Google Fonts, meta tags)
│   │   └── app.css                 # Global CSS (Cybersecurity Dark Theme, 500+ บรรทัด)
│   ├── svelte.config.js            # ตั้งค่า SvelteKit (adapter-node)
│   ├── vite.config.ts              # ตั้งค่า Vite (proxy /api → localhost:3001)
│   ├── tsconfig.json               # TypeScript config
│   ├── package.json                # Dependencies (svelte 5, vite 6, @lucide/svelte)
│   ├── Dockerfile                  # Production (multi-stage build)
│   └── Dockerfile.dev              # Development (hot-reload)
│
├── backend/                         # NestJS 10 REST API (port 3001)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts       # Auth module (JWT + Passport)
│   │   │   │   ├── auth.controller.ts   # POST /auth/register, POST /auth/login
│   │   │   │   ├── auth.service.ts      # Login/register logic (bcrypt hashing)
│   │   │   │   ├── dto/                 # DTO validation (class-validator)
│   │   │   │   └── guards/
│   │   │   │       └── jwt.strategy.ts  # JWT Strategy (Passport)
│   │   │   ├── users/
│   │   │   │   ├── users.module.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   └── entities/
│   │   │   │       └── user.entity.ts   # User entity (id, email, password, role)
│   │   │   ├── cv/
│   │   │   │   ├── cv.module.ts
│   │   │   │   ├── cv.controller.ts     # GET /cv, PATCH /cv, SSE /cv/stream
│   │   │   │   ├── cv.service.ts        # ★ initialCvData อยู่ที่นี่ (ข้อมูล CV เริ่มต้น)
│   │   │   │   └── entities/
│   │   │   │       └── cv.entity.ts     # CV entity (id, data JSON, updatedAt)
│   │   │   └── health/
│   │   │       └── health.controller.ts # GET /health
│   │   ├── app.module.ts               # Root module (ConfigModule, TypeORM, Auth, CV)
│   │   └── main.ts                     # Entry point (port 3001, CORS, ValidationPipe)
│   ├── package.json                # Dependencies (NestJS 10, TypeORM, bcrypt, sqlite3, pg)
│   ├── Dockerfile                  # Production
│   └── Dockerfile.dev              # Development
│
├── nginx/
│   ├── nginx.conf                  # Reverse proxy (HTTP→HTTPS redirect, TLS 1.2/1.3)
│   └── ssl/
│       ├── server.crt              # Self-Signed SSL Certificate (365 วัน)
│       ├── server.key              # Private Key (อยู่ใน .gitignore)
│       └── generate-cert.sh        # Script สร้าง certificate ใหม่
│
├── docs/
│   └── architecture.md             # แผนภาพสถาปัตยกรรมระบบ
│
├── .github/workflows/
│   └── ci.yml                      # CI pipeline
│
├── docker-compose.yml              # Production (Nginx + Frontend + Backend + PostgreSQL + Redis)
├── docker-compose.dev.yml          # Development (hot-reload + exposed ports)
├── .env.example                    # Template ตัวแปรสภาพแวดล้อม
├── .env                            # ตัวแปรจริง (อยู่ใน .gitignore)
├── .gitignore                      # ไฟล์ที่ไม่ push ขึ้น Git
├── CLAUDE.md                       ← คุณอยู่ที่นี่
└── README.md                       # เอกสารสำหรับผู้ใช้ทั่วไป
```

---

## สถาปัตยกรรมระบบ

### ผ่าน Docker (Production / Dev)

```
Browser
  │
  ▼
Nginx :80/:443  (SSL termination, HTTP→HTTPS redirect)
  │
  ├── /api/*       → backend:3001  (NestJS REST API)
  ├── /__vite_hmr  → frontend:3000 (Vite HMR WebSocket — dev เท่านั้น)
  └── /*           → frontend:3000 (SvelteKit SSR)
                        │
backend:3001 ───────────┤
  ├── PostgreSQL :5432  │  (ฐานข้อมูลหลัก)
  └── Redis      :6379  │  (Cache / Session)
```

### รัน Local (ไม่มี Docker)

```
Browser
  │
  ├── http://localhost:5173  → SvelteKit Dev Server (Vite)
  │     └── /api/*           → Proxy rewrite ลบ /api → localhost:3001
  │
  └── http://localhost:3001  → NestJS Backend
        └── SQLite (database.sqlite ในโฟลเดอร์ backend/)
```

**สำคัญ:** เมื่อรัน Local ไม่ผ่าน Docker:
- Frontend ใช้ Vite proxy ใน `vite.config.ts` แทน Nginx
- Vite proxy มี `rewrite: (path) => path.replace(/^\/api/, '')` เพื่อลบ `/api` prefix
- Backend ใช้ SQLite แทน PostgreSQL (ตั้งค่า `DB_TYPE=sqlite` ใน `.env`)
- ไม่ต้องใช้ Redis

---

## ตัวแปรสภาพแวดล้อม (.env)

คัดลอก `.env.example` → `.env` ก่อนรันทุกครั้ง

| ตัวแปร | ใช้โดย | Docker | Local | คำอธิบาย |
|---|---|---|---|---|
| `NODE_ENV` | ทั้งสอง | `production` | `development` | โหมดการทำงาน |
| `DB_TYPE` | backend | `postgres` | `sqlite` | ชนิดฐานข้อมูล |
| `DB_HOST` | backend | `postgres` | ไม่ใช้ | Host ฐานข้อมูล |
| `DB_PORT` | backend | `5432` | ไม่ใช้ | Port ฐานข้อมูล |
| `DB_DATABASE` | backend | `appdb` | `database.sqlite` | ชื่อ/ไฟล์ฐานข้อมูล |
| `DB_USERNAME` | backend | `appuser` | ไม่ใช้ | Username DB |
| `DB_PASSWORD` | backend | `changeme` | ไม่ใช้ | Password DB |
| `REDIS_URL` | backend | `redis://redis:6379` | ไม่ใช้ | Redis connection |
| `JWT_SECRET` | backend | ค่าที่ซับซ้อน | ค่าที่ซับซ้อน | Secret สำหรับ JWT (≥32 ตัวอักษร) |
| `JWT_EXPIRES_IN` | backend | `7d` | `7d` | อายุ JWT token |
| `VITE_API_URL` | frontend | `https://localhost/api` | `/api` | URL ของ API ที่ browser เห็น |
| `ALLOWED_ORIGIN` | backend | `https://localhost` | `http://localhost` | CORS allowed origin |

> **⚠️ สำคัญ:**
> - ตัวแปร `VITE_*` จะถูกส่งไปยัง browser — **ห้ามใส่ค่า secret**
> - เมื่อรัน Local ให้ตั้ง `VITE_API_URL=/api` (ใช้ Vite proxy)
> - เมื่อรันผ่าน Docker ให้ตั้ง `VITE_API_URL=https://localhost/api` (ผ่าน Nginx)
> - `ConfigModule` ใน `app.module.ts` อ่านไฟล์ `.env` จาก `../` (parent directory ของ backend)

---

## คำสั่งที่ใช้บ่อย

### รัน Local (ไม่มี Docker)

```bash
# ── ขั้นตอนแรก (ครั้งเดียว) ──
cp .env.example .env
# แก้ไข .env: DB_TYPE=sqlite, VITE_API_URL=/api

# ── ลง dependencies ──
cd backend && npm ci && cd ..
cd frontend && npm ci && cd ..

# ── เปิด Terminal หน้าต่างที่ 1 (Backend) ──
cd backend
npm run start:dev
# รอจนขึ้น "Backend running on port 3001"

# ── เปิด Terminal หน้าต่างที่ 2 (Frontend) ──
cd frontend
npm run dev
# เปิดเบราว์เซอร์ที่ http://localhost:5173
```

### Docker Development (hot-reload)

```bash
docker compose -f docker-compose.dev.yml up --build
# เปิดเบราว์เซอร์ที่ https://localhost (ยอมรับ self-signed cert)

# หยุดและลบ containers
docker compose -f docker-compose.dev.yml down

# ลบ volumes ด้วย (ล้างข้อมูล DB)
docker compose -f docker-compose.dev.yml down -v
```

### Docker Production

```bash
docker compose up -d --build
docker compose ps          # ตรวจสอบสถานะ
docker compose logs -f     # ดู logs
docker compose down        # หยุด
```

---

## API Endpoints

ทุก endpoint อยู่ภายใต้ prefix `/api/` (Nginx strip ออกก่อนส่งไป backend)

| Method | Path | Auth | คำอธิบาย |
|--------|------|:----:|----------|
| `POST` | `/api/auth/register` | ❌ | ลงทะเบียนผู้ใช้ใหม่ |
| `POST` | `/api/auth/login` | ❌ | เข้าสู่ระบบ → รับ JWT token |
| `GET` | `/api/health` | ❌ | ตรวจสอบสถานะระบบ |
| `GET` | `/api/cv` | ❌ | ดึงข้อมูล CV (ถ้ายังไม่มีจะสร้างจาก `initialCvData`) |
| `PATCH` | `/api/cv` | ❌* | อัปเดตข้อมูล CV |
| `GET` | `/api/cv/stream` | ❌ | Stream ข้อมูล CV แบบ Real-time (SSE) |

> *หมายเหตุ: CV endpoints ปัจจุบันยังไม่มี JWT guard — สามารถเพิ่มได้ภายหลัง

---

## ไฟล์สำคัญที่ต้องรู้ (สำหรับแก้ไขเนื้อหา)

### แก้ข้อมูล CV เริ่มต้น (ชื่อ, ประวัติ, โปรเจค, ทักษะ)
📁 `backend/src/modules/cv/cv.service.ts` — ตัวแปร `initialCvData` (บรรทัด 7-72)

### แก้หน้าตา UI / ไอคอน / โครงสร้างหน้าจอ
| สิ่งที่ต้องการแก้ | ไฟล์ |
|---|---|
| แถบเมนูบนสุด (โลโก้, เมนู) | `frontend/src/lib/components/Navbar.svelte` |
| ข้อมูลส่วนตัว (ชื่อ, อีเมล, GitHub, LinkedIn) | `frontend/src/lib/components/ProfileCard.svelte` |
| ประวัติการศึกษา | `frontend/src/lib/components/EducationCard.svelte` |
| ใบรับรอง (Certifications) | `frontend/src/lib/components/CertCard.svelte` |
| ผลงานและรางวัล | `frontend/src/lib/components/AchievementCard.svelte` |
| ทักษะ | `frontend/src/lib/components/SkillsSection.svelte` |
| โปรเจค | `frontend/src/lib/components/ProjectCard.svelte` |
| สี, ธีม, พื้นหลัง, animation | `frontend/src/app.css` |
| โครงสร้างหน้าแรก (Layout) | `frontend/src/routes/+page.svelte` |
| ชื่อบน Tab เบราว์เซอร์ | `frontend/src/routes/+page.svelte` (บรรทัด `<title>`) |
| HTML template (Fonts, Meta) | `frontend/src/app.html` |

### ไอคอน
ใช้ไลบรารี **Lucide** (`@lucide/svelte`) — ดูรายชื่อไอคอนทั้งหมดที่ https://lucide.dev

---

## Coding Conventions

### Frontend (SvelteKit)
- ใช้ **file-based routing** ใน `src/routes/`
- แต่ละหน้า = `+page.svelte`, layout = `+layout.svelte`
- API calls รวมที่ `src/lib/api.ts` — **ห้ามใช้ `fetch()` ตรง ๆ**
- ตัวแปร environment ฝั่ง client ต้องขึ้นต้นด้วย `VITE_`
- ใช้ **Vanilla CSS** (Cybersecurity Dark Theme) ใน `app.css`
- ข้อความ UI เป็น **ภาษาไทย**, ชื่อตัวแปร/ฟังก์ชันเป็นภาษาอังกฤษ
- ใช้ Svelte 5 runes syntax

### Backend (NestJS)
- โครงสร้างแบบ feature-based: `src/modules/<feature>/`
- แต่ละ module มี: `controller`, `service`, `dto`, `entity`, `module`
- DTOs ใช้ `class-validator` decorators
- ใช้ `ConfigService` เสมอ — **ห้ามใช้ `process.env` โดยตรง**
- `ConfigModule.forRoot()` อ่าน `.env` จาก `envFilePath: '../.env'`
- ฐานข้อมูลเชื่อมผ่าน TypeORM (`autoLoadEntities: true`, `synchronize: true`)

### ทั่วไป
- Commits ตาม Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`
- Secrets ทั้งหมดผ่าน environment variables — **ห้าม hardcode**

---

## ข้อผิดพลาดที่พบบ่อย

| ปัญหา | สาเหตุ | วิธีแก้ |
|---|---|---|
| `JwtStrategy requires a secret or key` | Backend หาไฟล์ `.env` ไม่เจอ หรือ `JWT_SECRET` ว่าง | ตรวจว่ามีไฟล์ `.env` อยู่ที่ root project และ `JWT_SECRET` มีค่า |
| `npm ci` ล้มเหลว (EPERM) | ไฟล์ใน `node_modules` ถูกล็อกโดย Windows | ปิดโปรแกรมที่ใช้ไฟล์นั้น แล้วลบ `node_modules` ด้วย Force Delete |
| Frontend แสดงหน้าเปล่า (ไม่มีข้อมูล) | `VITE_API_URL` ชี้ผิด หรือ Vite proxy ไม่มี rewrite | ตั้ง `VITE_API_URL=/api` (local) และตรวจ `vite.config.ts` มี rewrite |
| `EADDRINUSE: address already in use` | มี process เก่าค้างอยู่บน port เดียวกัน | Kill process เก่า: `Stop-Process -Name "node" -Force` |
| CORS blocked | `ALLOWED_ORIGIN` ไม่ตรงกับ URL ของ frontend | แก้ค่า `ALLOWED_ORIGIN` ใน `.env` ให้ตรง |
| Vite HMR ไม่ทำงาน (Docker) | nginx.conf ขาด location block สำหรับ `/__vite_hmr` | ตรวจว่ามี WebSocket upgrade headers ใน nginx.conf |

---

## Tech Stack

| เทคโนโลยี | เวอร์ชัน | หน้าที่ |
|---|---|---|
| SvelteKit | 2.x | Frontend framework (SSR + SPA) |
| Svelte | 5.x | UI component framework |
| Vite | 6.x | Build tool + dev server |
| NestJS | 10.x | Backend REST API framework |
| TypeORM | 0.3.x | ORM (PostgreSQL + SQLite) |
| PostgreSQL | 16 | ฐานข้อมูลหลัก (Docker) |
| SQLite | 5.x | ฐานข้อมูลสำหรับ Local dev |
| Redis | 7 | Cache + session (Docker) |
| Nginx | 1.25 | Reverse proxy + SSL termination |
| Docker | latest | Containerization |
| Node.js | 20+ | Runtime |
| TypeScript | 5.x | ภาษาหลัก |
| Lucide | latest | ไลบรารีไอคอน (@lucide/svelte) |
