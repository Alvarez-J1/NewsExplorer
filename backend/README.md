# NewsExplorer – Spring Boot Backend

Production-style REST API that powers the NewsExplorer React frontend.

**Stack:** Java 21 · Spring Boot 3 · Spring Security · JWT · BCrypt · Spring Data JPA · PostgreSQL

---

## Prerequisites

| Tool | Version |
|------|---------|
| Java | 21+ |
| Maven | 3.9+ |
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
PORT=3001

DB_URL=jdbc:postgresql://localhost:5432/newsexplorer
DB_USERNAME=postgres
DB_PASSWORD=your_password

# Generate a strong secret: openssl rand -hex 32
JWT_SECRET=replace_with_a_256_bit_random_secret
JWT_EXPIRATION_MS=86400000

# React dev server origin (no trailing slash)
ALLOWED_ORIGIN=http://localhost:3000
```

Export the variables before running (or use a tool like `direnv`):

```bash
export $(grep -v '^#' .env | xargs)
```

---

## 3. Run the backend

```bash
# From the /backend directory
mvn spring-boot:run
```

With the example `.env`, the server starts on **http://localhost:3001**.
Without `PORT`, the application falls back to **8080**, which matches container platforms such as Northflank.

> To change the port, set the `PORT` environment variable.

---

## Deploy to Northflank

For Northflank deployment, see [`../NORTHFLANK_DEPLOYMENT.md`](../NORTHFLANK_DEPLOYMENT.md).

## Deploy to Render

The Render instructions remain here because the existing PostgreSQL database is still hosted on Render.

This repo includes a root `render.yaml` blueprint and `backend/Dockerfile` for deploying the Spring Boot API as a Docker web service with Render PostgreSQL.

### Option A: Deploy from the blueprint

1. Push the repository to GitHub.
2. In Render, choose **New +** -> **Blueprint**.
3. Select this repository and let Render read `render.yaml`.
4. Render will create:
   - `newsexplorer-backend` Docker web service
   - `newsexplorer-db` PostgreSQL database
5. Fill in the manual environment variables listed below.
6. Deploy the service.

The web service health check path is:

```text
/health
```

If you keep the backend on Render's free plan, the first request after an idle
period can still cold-start; for portfolio demos, consider an external uptime
monitor that requests `/health` every few minutes or move the web service to a
plan with fewer cold starts.

### Option B: Create the web service manually

1. In Render, create a PostgreSQL database.
2. Create a new Docker web service from this repository.
3. Set the Docker context to `./backend`.
4. Set the Dockerfile path to `./backend/Dockerfile`.
5. Set the health check path to `/health`.
6. Add the environment variables below.

### Render environment variables

Set these on the backend web service:

| Variable | Required | Value |
|----------|----------|-------|
| `PORT` | No | Render sets this automatically. Leave unset unless Render instructs otherwise. |
| `DATABASE_URL` | Blueprint only | Set automatically from Render PostgreSQL. The app converts Render's Postgres URL into a JDBC URL at startup. |
| `DB_URL` | Manual deploy only | JDBC URL for the Render database, for example `jdbc:postgresql://<internal-host>:5432/<database-name>` |
| `DB_USERNAME` | Yes | Render PostgreSQL username |
| `DB_PASSWORD` | Yes | Render PostgreSQL password |
| `JWT_SECRET` | Yes | Strong random secret, at least 32 bytes. Example generator: `openssl rand -hex 32` |
| `JWT_EXPIRATION_MS` | Yes | Token lifetime in milliseconds, for example `86400000` for 24 hours |
| `ALLOWED_ORIGIN` | Yes | Deployed frontend origin with no trailing slash, for example `https://your-frontend.onrender.com` |
| `DEMO_EMAIL` | No | Seeded demo account email. Default: `demo@newsexplorer.dev` |
| `DEMO_PASSWORD` | No | Seeded demo account password used only by the backend seed process |
| `DEMO_NAME` | No | Seeded demo account display name. Default: `Demo Reader` |

Do not commit `.env` files or real secrets.

When deploying from the blueprint, Render supplies `DATABASE_URL`, `DB_USERNAME`, and `DB_PASSWORD` automatically. You only need to enter `ALLOWED_ORIGIN` when Render asks for manual values.

For manual web service deploys, set `DB_URL` yourself. `DB_URL` must be a JDBC URL beginning with `jdbc:postgresql://`. Render's displayed external/internal database URLs may use `postgres://`; convert that host/database information into the JDBC format above.

---

## 4. Run the React frontend

From the project root:

```bash
npm install
npm run dev
```

The frontend dev server runs on **http://localhost:3000** and calls the API at `http://localhost:3001` (via `VITE_API_URL`).

---

## API Reference

All protected routes require `Authorization: Bearer <token>`.

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/signup` | Public | Register a new user |
| `POST` | `/signin` | Public | Sign in and receive a JWT plus user payload |
| `POST` | `/signin/demo` | Public | Sign in as the seeded demo user and receive a JWT plus user payload |

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
{
  "token": "<jwt>",
  "data": { "_id": "uuid", "name": "Jane Doe", "email": "user@example.com" }
}
```

#### POST /signin/demo

```json
// Response 200
{
  "token": "<jwt>",
  "data": { "_id": "uuid", "name": "Demo Reader", "email": "demo@newsexplorer.dev" }
}
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
