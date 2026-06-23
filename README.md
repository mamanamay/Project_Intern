# 🎯 CV/Portfolio — Napatwan Chaiban

> เว็บแอปพลิเคชัน CV/Portfolio สำหรับ นภัสรวรรณ ชัยบาล  
> สร้างด้วย SvelteKit + NestJS + PostgreSQL — รองรับ HTTPS พร้อมใช้งานจริง

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

---

## 📋 สารบัญ

- [คุณสมบัติหลัก](#-คุณสมบัติหลัก)
- [เริ่มต้นใช้งาน](#-เริ่มต้นใช้งาน)
- [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
- [วิธีแก้ไขเนื้อหาในเว็บ](#-วิธีแก้ไขเนื้อหาในเว็บ)
- [API Endpoints](#-api-endpoints)
- [คำสั่ง Docker](#-คำสั่ง-docker)
- [ตัวแปรสภาพแวดล้อม](#️-ตัวแปรสภาพแวดล้อม)
- [HTTPS / SSL](#-https--ssl)
- [License](#-license)

---

## ✨ คุณสมบัติหลัก

- 🌙 **ธีมมืดสไตล์ Cybersecurity** — สีสัน Gradient, Glassmorphism, Micro-animations
- ✏️ **Admin Mode** — คลิกแก้ไขข้อมูลบนหน้าเว็บได้ทันที (บันทึกอัตโนมัติ)
- 📡 **Real-time Update** — ข้อมูลอัปเดตแบบ Server-Sent Events (SSE)
- 🔐 **HTTPS** — รองรับ SSL/TLS ผ่าน Nginx (Self-Signed Certificate)
- 🐳 **Docker Ready** — รันได้ทั้งแบบ Docker และแบบ Local
- 📱 **Responsive** — รองรับทุกขนาดหน้าจอ
- 🇹🇭 **UI ภาษาไทย** — ข้อความบนหน้าเว็บเป็นภาษาไทยทั้งหมด

---

## 🚀 เริ่มต้นใช้งาน

### ความต้องการเบื้องต้น

- [Node.js 20+](https://nodejs.org/) (สำหรับรันแบบ Local)
- [Docker](https://docs.docker.com/get-docker/) และ Docker Compose (สำหรับรันแบบ Docker)
- Git

### วิธีที่ 1: รันแบบ Local (แนะนำสำหรับพัฒนา)

ไม่ต้องลง Docker, PostgreSQL, หรือ Redis — ใช้ SQLite แทนได้เลย

```bash
# 1. Clone โปรเจกต์
git clone https://github.com/<your-username>/Project_Intern.git
cd Project_Intern

# 2. ตั้งค่า Environment
cp .env.example .env
# แก้ไขในไฟล์ .env:
#   DB_TYPE=sqlite
#   VITE_API_URL=/api

# 3. ลง Dependencies (ครั้งแรกครั้งเดียว)
cd backend && npm ci && cd ..
cd frontend && npm ci && cd ..

# 4. เปิด Terminal หน้าต่างที่ 1 — รัน Backend
cd backend
npm run start:dev
# ✅ รอจนขึ้น "Backend running on port 3001"

# 5. เปิด Terminal หน้าต่างที่ 2 — รัน Frontend
cd frontend
npm run dev
# ✅ เปิดเบราว์เซอร์ที่ http://localhost:5173
```

### วิธีที่ 2: รันแบบ Docker (แนะนำสำหรับ Production)

```bash
# 1. Clone และตั้งค่า
git clone https://github.com/<your-username>/Project_Intern.git
cd Project_Intern
cp .env.example .env

# 2. สร้าง SSL Certificate (ถ้ายังไม่มี)
# ดูหัวข้อ "HTTPS / SSL" ด้านล่าง

# 3. รัน Development (hot-reload)
docker compose -f docker-compose.dev.yml up --build

# 4. หรือรัน Production
docker compose up -d --build
```

| Service | URL |
|---------|-----|
| 🌐 Frontend | [https://localhost](https://localhost) |
| 🔌 API | [https://localhost/api](https://localhost/api) |
| 💚 Health Check | [https://localhost/api/health](https://localhost/api/health) |

> **หมายเหตุ:** เบราว์เซอร์จะแจ้งเตือน "Not Secure" เพราะเป็น Self-Signed Certificate  
> ให้กด **"Advanced" → "Proceed to localhost"** เพื่อเข้าใช้งาน

---

## 📁 โครงสร้างโปรเจกต์

```
Project_Intern/
├── frontend/                   # SvelteKit 2 + Vite 6
│   ├── src/
│   │   ├── routes/            # หน้าเว็บ
│   │   │   ├── +layout.svelte # Layout หลัก (Navbar + Footer)
│   │   │   └── +page.svelte   # หน้าแรก (แสดง CV + ปุ่ม Admin)
│   │   ├── lib/
│   │   │   ├── api.ts         # API client กลาง
│   │   │   ├── stores/cv.ts   # State management (Svelte store)
│   │   │   └── components/    # UI Components ทั้งหมด
│   │   ├── app.html           # HTML template
│   │   └── app.css            # ธีม Cybersecurity Dark (500+ บรรทัด)
│   ├── svelte.config.js
│   ├── vite.config.ts         # Proxy /api → localhost:3001
│   ├── Dockerfile
│   └── Dockerfile.dev
│
├── backend/                    # NestJS 10 REST API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/          # JWT authentication
│   │   │   ├── users/         # จัดการผู้ใช้
│   │   │   ├── cv/            # ★ จัดการข้อมูล CV (CRUD + SSE)
│   │   │   └── health/        # Health check
│   │   ├── app.module.ts      # Root module
│   │   └── main.ts            # Entry point (port 3001)
│   ├── Dockerfile
│   └── Dockerfile.dev
│
├── nginx/
│   ├── nginx.conf             # Reverse proxy + HTTPS
│   └── ssl/                   # SSL Certificates
│       ├── server.crt
│       ├── server.key
│       └── generate-cert.sh
│
├── docker-compose.yml         # Production
├── docker-compose.dev.yml     # Development
├── .env.example               # Template ตัวแปร
├── CLAUDE.md                  # เอกสารสำหรับ AI / นักพัฒนา
└── README.md                  ← คุณอยู่ที่นี่
```

---

## ✏️ วิธีแก้ไขเนื้อหาในเว็บ

### วิธีที่ 1: ผ่านหน้าเว็บ (Admin Mode) — แนะนำ!

1. เปิดเว็บไซต์ขึ้นมา
2. กดปุ่ม **"🛡️ โหมดแอดมิน"** ที่มุมขวาล่าง
3. นำเมาส์ไปชี้ที่ข้อความที่ต้องการแก้ → จะมีไอคอน ✏️ ปรากฏ
4. คลิกเพื่อแก้ไข → พิมพ์ข้อมูลใหม่ → บันทึกอัตโนมัติ

### วิธีที่ 2: แก้จากโค้ดโดยตรง

| สิ่งที่ต้องการแก้ | ไปที่ไฟล์ |
|---|---|
| **ข้อมูล CV เริ่มต้น** (ชื่อ, ประวัติ, โปรเจค, ทักษะ, ลิงก์ GitHub/LinkedIn) | `backend/src/modules/cv/cv.service.ts` → ตัวแปร `initialCvData` |
| **แถบเมนูบนสุด** (โลโก้, ชื่อหัวข้อ, เมนู) | `frontend/src/lib/components/Navbar.svelte` |
| **ข้อมูลส่วนตัว** (ชื่อ, อีเมล, เบอร์โทร, ลิงก์โซเชียล) | `frontend/src/lib/components/ProfileCard.svelte` |
| **ประวัติการศึกษา** | `frontend/src/lib/components/EducationCard.svelte` |
| **ใบรับรอง** (Certifications) | `frontend/src/lib/components/CertCard.svelte` |
| **ผลงานและรางวัล** | `frontend/src/lib/components/AchievementCard.svelte` |
| **ทักษะ** (Programming, Tools) | `frontend/src/lib/components/SkillsSection.svelte` |
| **โปรเจค** | `frontend/src/lib/components/ProjectCard.svelte` |
| **สี / ธีม / พื้นหลัง / Animation** | `frontend/src/app.css` |
| **ชื่อบน Tab เบราว์เซอร์** | `frontend/src/routes/+page.svelte` → `<title>` |
| **ไอคอน** | ใช้ [Lucide Icons](https://lucide.dev) — import จาก `@lucide/svelte` |

> 💡 **ตัวอย่าง:** ต้องการเปลี่ยนโลโก้บนเมนูจาก `< /> Portfolio` เป็นชื่ออื่น  
> → เปิดไฟล์ `Navbar.svelte` → แก้ข้อความใน `<span>` บรรทัดที่ 9

---

## 🔌 API Endpoints

| Method | Path | คำอธิบาย |
|--------|------|----------|
| `POST` | `/api/auth/register` | ลงทะเบียนผู้ใช้ใหม่ |
| `POST` | `/api/auth/login` | เข้าสู่ระบบ → รับ JWT token |
| `GET` | `/api/health` | ตรวจสอบสถานะระบบ |
| `GET` | `/api/cv` | ดึงข้อมูล CV |
| `PATCH` | `/api/cv` | อัปเดตข้อมูล CV |
| `GET` | `/api/cv/stream` | Stream ข้อมูล CV แบบ Real-time (SSE) |

---

## 🐳 คำสั่ง Docker

```bash
# ── Development (hot-reload) ──
docker compose -f docker-compose.dev.yml up --build     # รัน
docker compose -f docker-compose.dev.yml logs -f         # ดู logs
docker compose -f docker-compose.dev.yml down            # หยุด
docker compose -f docker-compose.dev.yml down -v         # หยุด + ลบข้อมูล DB

# ── Production ──
docker compose up -d --build    # รัน background
docker compose ps               # ตรวจสถานะ
docker compose logs -f           # ดู logs
docker compose down              # หยุด

# ── Database ──
docker compose exec postgres psql -U appuser -d appdb   # เข้า PostgreSQL
```

---

## ⚙️ ตัวแปรสภาพแวดล้อม

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|--------|-------------|----------|
| `NODE_ENV` | `development` | โหมดการทำงาน |
| `DB_TYPE` | `postgres` | ชนิดฐานข้อมูล (`postgres` หรือ `sqlite`) |
| `DB_HOST` | `postgres` | Host ฐานข้อมูล |
| `DB_PORT` | `5432` | Port ฐานข้อมูล |
| `DB_DATABASE` | `appdb` | ชื่อฐานข้อมูล |
| `DB_USERNAME` | `appuser` | ชื่อผู้ใช้ DB |
| `DB_PASSWORD` | `changeme` | รหัสผ่าน DB |
| `JWT_SECRET` | — | Secret สำหรับ JWT (**เปลี่ยนก่อนใช้จริง!**) |
| `JWT_EXPIRES_IN` | `7d` | อายุ token |
| `VITE_API_URL` | `https://localhost/api` | URL ของ API |
| `ALLOWED_ORIGIN` | `https://localhost` | CORS origin |

> ⚠️ **สำคัญ:** เปลี่ยน `JWT_SECRET` และ `DB_PASSWORD` ก่อนใช้งานจริง!

---

## 🔐 HTTPS / SSL

โปรเจกต์นี้รองรับ HTTPS ผ่าน Nginx ด้วย Self-Signed SSL Certificate

### สร้าง Certificate ใหม่ (เมื่อหมดอายุ)

**Linux / macOS / Git Bash:**
```bash
cd nginx/ssl
bash generate-cert.sh
```

**Windows PowerShell (ใช้ OpenSSL จาก Git):**
```powershell
& "C:\Program Files\Git\usr\bin\openssl.exe" req -x509 -nodes -days 365 `
  -newkey rsa:2048 `
  -keyout nginx\ssl\server.key `
  -out nginx\ssl\server.crt `
  -subj "/C=TH/ST=KhonKaen/L=KhonKaen/O=Portfolio-Dev/CN=localhost" `
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
```

### การทำงาน
- Nginx listen ที่ port **80** (HTTP) และ **443** (HTTPS)
- HTTP จะ **redirect ไป HTTPS อัตโนมัติ** (301 redirect)
- ใช้ **TLS 1.2 / 1.3** พร้อม Security Headers (HSTS, X-Frame-Options)

### สำหรับ Production จริง
แนะนำให้เปลี่ยนจาก Self-Signed เป็น **Let's Encrypt** (ฟรี, ได้ใบรับรองที่เบราว์เซอร์เชื่อถือ)

---

## 📝 Commit Convention

| Prefix | ใช้เมื่อ | ตัวอย่าง |
|--------|---------|---------| 
| `feat:` | เพิ่ม feature ใหม่ | `feat: เพิ่มหน้า portfolio` |
| `fix:` | แก้ bug | `fix: แก้ปัญหา login ไม่ได้` |
| `docs:` | แก้ไขเอกสาร | `docs: อัปเดต README` |
| `chore:` | งาน tooling/config | `chore: อัปเดต Docker config` |
| `refactor:` | ปรับโครงสร้าง code | `refactor: แยก API client` |
| `style:` | แก้ไข formatting | `style: จัดรูปแบบ code` |

---

## 📄 License

โปรเจกต์นี้อยู่ภายใต้สัญญาอนุญาต [MIT License](LICENSE)

---

<p align="center">
  สร้างด้วย ❤️ โดย <strong>Napatwan Chaiban</strong>
</p>
