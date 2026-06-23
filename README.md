# 🎯 CV/Portfolio — Napatwan Chaiban

> เว็บแอปพลิเคชัน CV/Portfolio สำหรับ นภัสรวรรณ ชัยบาล  
> สร้างด้วย SvelteKit + NestJS + PostgreSQL — พร้อมใช้งานจริง

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

---

## 📋 สารบัญ

- [เริ่มต้นใช้งาน](#-เริ่มต้นใช้งาน)
- [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
- [API Endpoints](#-api-endpoints)
- [คำสั่ง Docker](#-คำสั่ง-docker)
- [ตัวแปรสภาพแวดล้อม](#-ตัวแปรสภาพแวดล้อม)
- [Commit Convention](#-commit-convention)
- [License](#-license)

---

## 🚀 เริ่มต้นใช้งาน

### ความต้องการเบื้องต้น

- [Docker](https://docs.docker.com/get-docker/) และ Docker Compose
- [Node.js 20+](https://nodejs.org/) (สำหรับรันแบบ local)
- Git

### 1. Clone และตั้งค่า

```bash
git clone https://github.com/<your-username>/Project_Intern.git
cd Project_Intern

# คัดลอกไฟล์ environment
cp .env.example .env
# แก้ไข .env ตามสภาพแวดล้อมของคุณ
```

### 2. Development (hot-reload)

```bash
docker compose -f docker-compose.dev.yml up --build
```

เปิดเบราว์เซอร์แล้วเข้าไปที่:

| Service | URL |
|---------|-----|
| 🌐 Frontend | [http://localhost](http://localhost) |
| 🔌 API | [http://localhost/api](http://localhost/api) |
| 💚 Health Check | [http://localhost/api/health](http://localhost/api/health) |

> **หมายเหตุ:** Vite HMR จะทำงานผ่าน WebSocket ที่ path `/__vite_hmr`  
> ทุกการแก้ไขไฟล์ `.svelte` หรือ `.ts` จะอัปเดตทันทีบนเบราว์เซอร์

### 3. Production

```bash
docker compose up -d --build
```

---

## 📁 โครงสร้างโปรเจกต์

```
Project_Intern/
├── frontend/                      # SvelteKit (Vite)
│   ├── src/
│   │   ├── routes/               # หน้าเว็บ (+page.svelte, +layout.svelte)
│   │   ├── lib/                  # โมดูลที่ใช้ร่วมกัน
│   │   │   ├── api.ts            # Centralized API client
│   │   │   └── components/       # Svelte components
│   │   └── app.html              # HTML template หลัก
│   ├── static/                   # ไฟล์ static (รูปภาพ, favicon)
│   ├── svelte.config.js          # ตั้งค่า SvelteKit
│   ├── vite.config.ts            # ตั้งค่า Vite
│   ├── Dockerfile                # Production (multi-stage)
│   └── Dockerfile.dev            # Development (hot-reload)
│
├── backend/                       # NestJS REST API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/             # JWT authentication
│   │   │   ├── users/            # จัดการผู้ใช้
│   │   │   ├── cv/               # จัดการข้อมูล CV
│   │   │   └── health/           # Health check
│   │   ├── common/               # Guards, decorators, filters
│   │   ├── app.module.ts         # Root module
│   │   └── main.ts               # Entry point
│   ├── Dockerfile                # Production
│   └── Dockerfile.dev            # Development
│
├── nginx/
│   └── nginx.conf                # Reverse proxy config
│
├── docker-compose.yml            # Production
├── docker-compose.dev.yml        # Development
├── .env.example                  # Template ตัวแปรสภาพแวดล้อม
├── CLAUDE.md                     # เอกสารสำหรับ AI assistant
└── README.md                     # ← คุณอยู่ที่นี่
```

---

## 🔌 API Endpoints

| Method | Path | Auth | คำอธิบาย |
|--------|------|:----:|----------|
| `POST` | `/api/auth/register` | ❌ | ลงทะเบียนผู้ใช้ใหม่ |
| `POST` | `/api/auth/login` | ❌ | เข้าสู่ระบบ → รับ JWT token |
| `GET` | `/api/health` | ❌ | ตรวจสอบสถานะระบบ |
| `GET` | `/api/cv` | ✅ | ดึงข้อมูล CV |
| `POST` | `/api/cv` | ✅ | สร้าง/อัปเดตข้อมูล CV |
| `GET` | `/api/cv/stream` | ✅ | Stream ข้อมูล CV (SSE) |

> **Auth ✅** = ต้องส่ง `Authorization: Bearer <token>` ใน header

---

## 🐳 คำสั่ง Docker

### Development

```bash
# สร้างและรันทุก service
docker compose -f docker-compose.dev.yml up --build

# รัน background mode
docker compose -f docker-compose.dev.yml up -d --build

# ดู logs ของ service ที่ต้องการ
docker compose -f docker-compose.dev.yml logs -f frontend
docker compose -f docker-compose.dev.yml logs -f backend

# หยุด containers
docker compose -f docker-compose.dev.yml down

# หยุดและลบข้อมูลทั้งหมด (รวม DB)
docker compose -f docker-compose.dev.yml down -v
```

### Production

```bash
# สร้างและรัน production
docker compose up -d --build

# ตรวจสอบสถานะ
docker compose ps

# ดู logs
docker compose logs -f

# หยุด
docker compose down
```

### Database

```bash
# รัน migrations
docker compose exec backend npm run migration:run

# สร้าง migration ใหม่
docker compose exec backend npm run migration:generate -- -n MigrationName

# ย้อน migration ล่าสุด
docker compose exec backend npm run migration:revert

# เข้าถึง PostgreSQL โดยตรง
docker compose exec postgres psql -U appuser -d appdb
```

---

## ⚙️ ตัวแปรสภาพแวดล้อม

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|--------|-------------|----------|
| `NODE_ENV` | `development` | โหมดการทำงาน |
| `DB_TYPE` | `postgres` | ชนิดฐานข้อมูล |
| `DB_HOST` | `postgres` | Host ฐานข้อมูล |
| `DB_PORT` | `5432` | Port ฐานข้อมูล |
| `DB_DATABASE` | `appdb` | ชื่อฐานข้อมูล |
| `DB_USERNAME` | `appuser` | ชื่อผู้ใช้ DB |
| `DB_PASSWORD` | `changeme` | รหัสผ่าน DB |
| `REDIS_URL` | `redis://redis:6379` | Redis connection string |
| `JWT_SECRET` | — | Secret สำหรับ JWT (อย่างน้อย 32 ตัวอักษร) |
| `JWT_EXPIRES_IN` | `7d` | อายุ token |
| `VITE_API_URL` | `http://localhost/api` | URL ของ API (ฝั่ง browser) |
| `ALLOWED_ORIGIN` | `http://localhost` | CORS allowed origin |

> ⚠️ **สำคัญ:** เปลี่ยน `JWT_SECRET` และ `DB_PASSWORD` ก่อนใช้งานจริง!

---

## 📝 Commit Convention

โปรเจกต์นี้ใช้ [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | ใช้เมื่อ | ตัวอย่าง |
|--------|---------|---------|
| `feat:` | เพิ่ม feature ใหม่ | `feat: เพิ่มหน้า portfolio` |
| `fix:` | แก้ bug | `fix: แก้ปัญหา login ไม่ได้` |
| `docs:` | แก้ไขเอกสาร | `docs: อัปเดต README` |
| `chore:` | งาน tooling/config | `chore: อัปเดต Docker config` |
| `refactor:` | ปรับโครงสร้าง code | `refactor: แยก API client` |
| `test:` | เพิ่ม/แก้ไข tests | `test: เพิ่ม unit test auth` |
| `style:` | แก้ไข formatting | `style: จัดรูปแบบ code` |

---

## 📄 License

โปรเจกต์นี้อยู่ภายใต้สัญญาอนุญาต [MIT License](LICENSE)

---

<p align="center">
  สร้างด้วย ❤️ โดย <strong>Napatwan Chaiban</strong>
</p>
