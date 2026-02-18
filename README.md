# Book Borrowing API (NestJS)

Repositori ini dibuat untuk **belajar** membangun RESTful API menggunakan [NestJS](https://nestjs.com/) dan TypeScript. Bukan untuk kebutuhan produksi.

## Fitur Utama

- ✅ Registrasi & login user (dengan JWT)
- ✅ Manajemen buku (tambah, lihat, update stok)
- ✅ Peminjaman & pengembalian buku
- ✅ Relasi database dengan TypeORM

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: TypeORM
- **Authentication**: JWT
- **Testing**: Jest

## Instalasi & Menjalankan Project

```bash
# install dependencies
npm install

# development
npm run start

# watch mode (auto reload)
npm run start:dev

# production
npm run start:prod
```

## Menjalankan Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage report
npm run test:cov
```

## Struktur Project

```
src/
├── auth/              # Authentication (register, login, JWT)
├── book/              # Book management
├── borrowing/         # Borrowing management
├── user/              # User management
├── common/            # Guards, middleware, decorators
└── database/          # Database config
```

## Entity Diagram

### User
```typescript
- id: number (Primary Key)
- name: string
- email: string (unique)
- password: string (hashed)
- borrowings: Borrowing[] (relation)
```

### Book
```typescript
- id: number (Primary Key)
- title: string
- author: string
- stock: number (default: 0)
- borrowings: Borrowing[] (relation)
```

### Borrowing
```typescript
- id: number (Primary Key)
- user: User (Foreign Key)
- book: Book (Foreign Key)
- borrowed_at: Date
- returned_at: Date | null
- isReturned: boolean (default: false)
```

## API Endpoints

### Auth Routes
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/auth/register` | Registrasi user baru |
| POST | `/auth/login` | Login dan dapatkan JWT token |

### Book Routes
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/books` | Tambah buku baru |
| GET | `/books` | Lihat semua buku |
| GET | `/books/:id` | Lihat detail buku |
| PUT | `/books/:id` | Update stok buku |

### Borrowing Routes
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/borrowings` | Pinjam buku (require auth) |
| PATCH | `/borrowings/:id/return` | Kembalikan buku (require auth) |

## Contoh Request & Response

### Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

# Response (berisi JWT token)
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Tambah Buku
```bash
POST /books
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "stock": 5
}
```

### Pinjam Buku
```bash
POST /borrowings
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "bookId": 1,
  "userId": 1
}
```

## Best Practices yang Dipelajari

- ✅ Modular architecture (Controllers, Services, Modules)
- ✅ Data validation dengan DTOs
- ✅ JWT authentication dan guards
- ✅ Database relationships (One-to-Many, Many-to-One)
- ✅ Exception handling
- ✅ Unit testing & E2E testing
- ✅ Type safety dengan TypeScript

## Notes

- Semua password harus di-hash sebelum disimpan ke database
- JWT token diperlukan untuk akses endpoint borrowing
- Stok buku tidak bisa negatif
- User hanya bisa meminjam buku jika stok tersedia
- Satu user bisa meminjam buku yang sama hanya 1 kali (sampai dikembalikan)

## Learning Resources

- [NestJS Official Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [JWT Authentication](https://jwt.io)
- [RESTful API Design](https://restfulapi.net)

---

<p align="center">📚 Dibuat untuk latihan belajar NestJS & TypeScript</p>
