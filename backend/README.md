# NewsExplorer – Spring Boot Backend

Production-style REST API that powers the NewsExplorer React frontend.

**Stack:** Java 21 · Spring Boot 3 · Spring Security · JWT · BCrypt · Spring Data JPA · PostgreSQL

---

## Prerequisites

| Tool | Version |
|------|---------|
| Java | 21+ |
| Maven | 3.9+ (or use the wrapper `./mvnw`) |
| PostgreSQL | 14+ |

---

## 1. Create the database

```sql
CREATE DATABASE newsexplorer;
```

---

## 2. Configure environment variables

Copy `.env.example` to `.env` (never commit `.env`):

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
DB_URL=jdbc:postgresql://localhost:5432/newsexplorer
DB_USERNAME=postgres
DB_PASSWORD=your_password

# Generate a strong secret: openssl rand -hex 32
JWT_SECRET=replace_with_a_256_bit_random_secret
JWT_EXPIRATION_MS=86400000

# React dev server origin (no trailing slash)
ALLOWED_ORIGIN=http://localhost:5173
```

Export the variables before running (or use a tool like `direnv`):

```bash
export $(grep -v '^#' .env | xargs)
```

---

## 3. Run the backend

```bash
# From the /backend directory
./mvnw spring-boot:run
```

The server starts on **http://localhost:3001** by default.

> To change the port, set the `PORT` environment variable.

---

## 4. Run the React frontend

From the project root:

```bash
npm install
npm run dev
```

The frontend dev server runs on **http://localhost:5173** and proxies API calls to `http://localhost:3001`.

---

## API Reference

All protected routes require `Authorization: Bearer <token>`.

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/signup` | Public | Register a new user |
| `POST` | `/signin` | Public | Sign in and receive a JWT |

#### POST /signup

```json
// Request body
{ "email": "user@example.com", "password": "secret123", "name": "Jane Doe" }

// Response 201
{ "data": { "_id": "uuid", "name": "Jane Doe", "email": "user@example.com" } }
```

#### POST /signin

```json
// Request body
{ "email": "user@example.com", "password": "secret123" }

// Response 200
{ "token": "<jwt>" }
```

### Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/users/me` | Required | Get the current user's profile |

#### GET /users/me

```json
// Response 200
{ "data": { "_id": "uuid", "name": "Jane Doe", "email": "user@example.com" } }
```

### Articles

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/articles` | Required | List saved articles |
| `POST` | `/articles` | Required | Save an article |
| `DELETE` | `/articles/{id}` | Required | Delete a saved article |

#### POST /articles

```json
// Request body
{
  "url": "https://example.com/article",
  "title": "Article title",
  "description": "Short description",
  "urlToImage": "https://example.com/img.jpg",
  "publishedAt": "2024-01-01T00:00:00Z",
  "source": "Example News",
  "keyword": "nature"
}

// Response 201
{
  "_id": "uuid",
  "url": "...",
  "title": "...",
  "description": "...",
  "urlToImage": "...",
  "publishedAt": "...",
  "source": "...",
  "keyword": "nature"
}
```

#### DELETE /articles/{id}

```json
// Response 200
{ "message": "Article deleted successfully" }
```

### Error responses

All errors return a consistent shape:

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Password must be at least 8 characters",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## Project structure

```
backend/
├── pom.xml
└── src/main/java/com/newsexplorer/backend/
    ├── NewsExplorerApplication.java
    ├── config/
    │   └── SecurityConfig.java          # Spring Security + CORS
    ├── controller/
    │   ├── AuthController.java          # POST /signup, POST /signin
    │   ├── UserController.java          # GET /users/me
    │   └── ArticleController.java       # GET|POST /articles, DELETE /articles/{id}
    ├── dto/
    │   ├── SignUpRequest.java
    │   ├── SignInRequest.java
    │   ├── AuthResponse.java
    │   ├── UserResponse.java
    │   ├── ArticleRequest.java
    │   ├── ArticleResponse.java
    │   └── ErrorResponse.java
    ├── entity/
    │   ├── User.java
    │   └── Article.java
    ├── exception/
    │   ├── GlobalExceptionHandler.java
    │   ├── ConflictException.java
    │   ├── ResourceNotFoundException.java
    │   └── UnauthorizedException.java
    ├── repository/
    │   ├── UserRepository.java
    │   └── ArticleRepository.java
    ├── security/
    │   ├── JwtService.java              # Token generation & validation
    │   ├── JwtAuthFilter.java           # Bearer token filter
    │   └── UserDetailsServiceImpl.java
    └── service/
        ├── AuthService.java
        ├── UserService.java
        └── ArticleService.java
```
