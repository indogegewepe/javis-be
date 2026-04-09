## Project Overview

Backend API ini dibangun menggunakan **Express.js dengan TypeScript** dan menggunakan **PostgreSQL** sebagai database.
Sistem ini menyediakan fitur autentikasi berbasis JWT, keamanan menggunakan rate limiting, serta validasi data menggunakan Zod.

---

## Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Language**: TypeScript
* **Database**: PostgreSQL/Supabase
* **Authentication**: JWT
* **Security**:

  * bcrypt
  * express-rate-limit
* **Validation**: Zod
* **Middleware**:

  * cookie-parser
  * cors

---

## Architecture

Project ini menggunakan arsitektur **layered / modular architecture**, dengan pemisahan tanggung jawab sebagai berikut:

```
src/
├── controllers/   → Handle request & response
├── services/      → Business logic
├── routes/        → Routing endpoint API
├── middlewares/   → Auth, rate limit, dll
├── validators/    → Validasi input (Zod)
├── utils/         → Helper (JWT, bcrypt, dll)
├── seeders/       → Script untuk seed data awal
└── config/        → Config database & environment
```

## Security Features

### 1. JWT Authentication

* Menggunakan `jsonwebtoken`
* Token disimpan di cookie
* Digunakan untuk proteksi route

### 2. Password Hashing

* Menggunakan `bcrypt`

### 3. Rate Limiting

* Maksimal **5 percobaan per IP**

---

## How to Run the Project

### 1. Clone Repository

```bash
git clone https://github.com/indogegewepe/javis-be.git
cd javis-be
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Buat file `.env`:

```env
ORIGIN_URL=http://localhost:3000
NODE_ENV=development
PORT=8080

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=javis_test

JWT_SECRET=your_jwt_secret_key
```

---

### 4. Setup Database

* Gunakan MySQL
* Buat database:

```sql
CREATE DATABASE javis_test;
```

---

### 5. Jalankan Seed Admin

```bash
npm run seed:admin
```

---

### 6. Run Development Server

```bash
npm run dev
```

Server akan berjalan di:

```
http://localhost:8080
```

---

### 7. Build Project

```bash
npm run build
```

---

### 8. Run Production

```bash
npm start
```

---

## API Structure

* `POST /api/auth/login`
* `POST /api/auth/logout`
* `GET /api/user/me`
