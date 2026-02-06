# 📚 Book Borrowing Management API (NestJS + TypeORM)

Dokumen ini berisi **step-by-step lengkap dari awal sampai akhir** pengerjaan asesmen backend menggunakan **NestJS + TypeScript**, lengkap dengan **DTO, JWT Authentication, SQL Database, dan E2E Testing**.

---

## 🎯 Tujuan Asesmen

Membangun REST API sistem peminjaman buku dengan kriteria:

* Minimal 2 CRUD yang saling berkaitan
* Database SQL
* Authentication JWT
* DTO & validasi
* E2E testing
* Clean Architecture

---

## 🧩 Tech Stack

* NestJS
* TypeScript
* PostgreSQL
* TypeORM
* JWT + Passport
* Jest + Supertest

---

## 🗂️ Struktur Final Project

```txt
src/
 ├── auth/
 │    ├── dto/
 │    ├── auth.controller.ts
 │    ├── auth.service.ts
 │    ├── jwt.strategy.ts
 │    └── auth.module.ts
 ├── users/
 │    ├── dto/
 │    ├── user.entity.ts
 │    ├── users.service.ts
 │    └── users.module.ts
 ├── books/
 │    ├── dto/
 │    ├── book.entity.ts
 │    ├── books.controller.ts
 │    ├── books.service.ts
 │    └── books.module.ts
 ├── borrowings/
 │    ├── dto/
 │    ├── borrowing.entity.ts
 │    ├── borrowings.controller.ts
 │    ├── borrowings.service.ts
 │    └── borrowings.module.ts
 ├── common/
 │    └── guards/jwt-auth.guard.ts
 ├── app.module.ts
 └── main.ts
```

---

## 1️⃣ Inisialisasi Project

```bash
nest new book-borrowing-api
cd book-borrowing-api
```

Install dependency:

```bash
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install class-validator class-transformer
npm install --save-dev supertest
```

---

## 2️⃣ Konfigurasi Database (PostgreSQL + TypeORM)

### `.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=book_borrowing_db
JWT_SECRET=supersecretkey
```

### `TypeOrmModule.forRoot`

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
});
```

---

## 3️⃣ Entity (Database Model)

### User Entity

```ts
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Borrowing, b => b.user)
  borrowings: Borrowing[];
}
```

### Book Entity

```ts
@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;

  @OneToMany(() => Borrowing, b => b.book)
  borrowings: Borrowing[];
}
```

### Borrowing Entity

```ts
@Entity('borrowings')
export class Borrowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, u => u.borrowings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Book, b => b.borrowings)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  borrowedAt: Date;

  @Column({ nullable: true })
  returnedAt: Date;
}
```

---

## 4️⃣ DTO (Data Transfer Object)

### Register DTO

```ts
export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;
}
```

### Login DTO

```ts
export class LoginDto {
  email: string;
  password: string;
}
```

### Create Book DTO

```ts
export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsInt()
  stock: number;
}
```

### Borrow Book DTO

```ts
export class BorrowBookDto {
  @IsInt()
  bookId: number;
}
```

---

## 5️⃣ Authentication (JWT Session)

### Flow

1. Register user
2. Password di-hash (bcrypt)
3. Login → JWT token
4. Token dikirim via `Authorization: Bearer`

### JwtStrategy

* Extract token
* Validate user

### JwtAuthGuard

Digunakan untuk proteksi endpoint

---

## 6️⃣ Controller & Service Logic

### Book Service (contoh)

* Create book
* Get books

### Borrowing Service (inti asesmen)

* Cek stok buku
* Simpan borrowing
* Kurangi / tambah stok
* Validasi user peminjam

---

## 7️⃣ Authorization

Gunakan:

```ts
@UseGuards(JwtAuthGuard)
```

Pada:

* `/books`
* `/borrowings`

---

## 8️⃣ E2E Testing (Token-based)

### Skenario

1. Register user
2. Login → ambil JWT
3. Create book
4. Borrow book
5. Get borrowing list
6. Access tanpa token → 401

---

## 9️⃣ Clean Architecture

* Controller → HTTP layer
* Service → business logic
* Entity/Repository → database

Dipilih karena:

* Mudah dirawat
* Mudah dites
* Standar industri backend

---

## ✅ Akhir Asesmen

Asesmen selesai ketika:

* Semua endpoint berjalan
* JWT berfungsi
* Relasi database valid
* E2E test lulus
* README menjelaskan arsitektur

---

✨ *Project ini siap dikumpulkan sebagai asesmen backend profesional.*
