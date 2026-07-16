# NewsExplorer Northflank Deployment

This guide prepares the Spring Boot backend in `backend/` for Northflank's free Developer Sandbox tier while keeping the existing Render PostgreSQL database.

Do not commit real database credentials, JWT secrets, or full production connection strings.

## Confirmed Backend Architecture

| Item | Current value |
| --- | --- |
| Java version | Java 21, from `backend/pom.xml` |
| Spring Boot version | 3.3.0, from `backend/pom.xml` |
| Build tool | Maven |
| Dockerfile location | `backend/Dockerfile` |
| Docker build context | `backend/` |
| Main application class | `com.newsexplorer.backend.NewsExplorerApplication` |
| Database | PostgreSQL through Spring Data JPA and the PostgreSQL JDBC driver |
| Database env vars | `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` |
| CORS env var | `ALLOWED_ORIGIN` |
| JWT env vars | `JWT_SECRET`, `JWT_EXPIRATION_MS` |
| Health endpoint | `GET /api/health`, also `GET /health` |
| Runtime port | `server.port=${PORT:8080}` |

Spring Boot binds its embedded server to all interfaces by default because this repository does not set `server.address`.

## Verified Runtime Behavior

- `backend/src/main/resources/application.properties` reads `PORT`, `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRATION_MS`, and `ALLOWED_ORIGIN` from environment variables.
- `DB_URL` accepts this JDBC format:

```text
jdbc:postgresql://HOST:5432/newsexplorer
```

- Because Northflank runs outside Render's private network, use the Render PostgreSQL external hostname and port. Do not use the Render internal hostname.
- `SecurityConfig` permits `GET /api/health` without authentication.
- CORS uses exactly one configured origin and `allowCredentials=true`; do not use `*` for `ALLOWED_ORIGIN`.
- The Dockerfile is already a Java 21 multi-stage build: Maven builds the JAR, and the runtime image runs only `/app/app.jar`.

## Northflank Service Settings

Use these values when creating the service:

| Northflank field | Value |
| --- | --- |
| Service type | Combined Service |
| Source | GitHub |
| Repository | `Alvarez-J1/NewsExplorer` or your fork |
| Branch | `main`, unless deploying another branch |
| Build type | Dockerfile |
| Build context | `/backend` |
| Dockerfile location | `/backend/Dockerfile` |
| Build command | None; the Dockerfile runs `mvn -B package -DskipTests` |
| Start command | None; use Dockerfile entrypoint `java -jar /app/app.jar` |
| Container port | `8080` |
| Public HTTP port | `8080`, HTTP, publicly exposed |
| Health-check path | `/api/health` |
| Health-check type | HTTP GET |
| Instances | `1` |
| Compute plan | Smallest available free compute that offers at least `512 MB` RAM; use `nf-compute-20` (`0.2 shared vCPU`, `512 MB`) if available |
| Runtime variables | Add all required variables from the table below |

Northflank can detect ports exposed by the Dockerfile, but still verify that the public HTTP port is `8080`.

## Runtime Variables

| Name | Required | Expected format | Where the value comes from | Sensitive |
| --- | --- | --- | --- | --- |
| `ALLOWED_ORIGIN` | Yes | Frontend origin with no trailing slash, for example `https://news-explorer-ten.vercel.app` | Vercel frontend deployment URL | No |
| `DB_URL` | Yes | `jdbc:postgresql://HOST:5432/newsexplorer` | Render PostgreSQL external hostname and database name | Treat as sensitive if it includes credentials; otherwise no |
| `DB_USERNAME` | Yes | Plain PostgreSQL username | Render PostgreSQL dashboard | Yes |
| `DB_PASSWORD` | Yes | Plain PostgreSQL password | Render PostgreSQL dashboard | Yes |
| `JWT_SECRET` | Yes | Strong random value, at least 32 bytes; example generator: `openssl rand -hex 32` | Generate locally or in a password manager | Yes |
| `JWT_EXPIRATION_MS` | Yes | Integer milliseconds, for example `86400000` | Choose based on desired session lifetime | No |
| `JAVA_TOOL_OPTIONS` | Recommended | `-XX:MaxRAMPercentage=70.0 -XX:InitialRAMPercentage=20.0 -XX:+UseSerialGC` | Enter manually in Northflank runtime variables | No |
| `PORT` | Optional | `8080` | Northflank can provide this; set manually only if needed | No |

Optional demo-account variables already supported by the app:

| Name | Required | Expected format | Where the value comes from | Sensitive |
| --- | --- | --- | --- | --- |
| `DEMO_EMAIL` | No | Email address | Choose if overriding the default demo user | No |
| `DEMO_PASSWORD` | No | Strong password | Choose if overriding the default demo user | Yes |
| `DEMO_NAME` | No | Text | Choose if overriding the default demo user | No |

Do not set `DATABASE_URL` on Northflank unless you intentionally want to use the legacy Render-style URL conversion. Prefer `DB_URL`.

## Northflank Dashboard Steps

1. Log in to Northflank.
2. Create or open a project.
3. Choose **Create new** -> **Service**.
4. Select **Combined Service**.
5. Select GitHub as the source.
6. Select the NewsExplorer repository.
7. Select the `main` branch, unless deploying another branch.
8. Choose **Dockerfile** as the build type.
9. Set build context to `/backend`.
10. Set Dockerfile location to `/backend/Dockerfile`.
11. Leave build command empty.
12. Leave start command empty.
13. Confirm port `8080` is added as an HTTP public port.
14. Add an HTTP health check for port `8080` with path `/api/health`.
15. Set instances to `1`.
16. Select the smallest free compute available with at least `512 MB` RAM.
17. Add the runtime variables from the table above.
18. Create the service and wait for the first build and deployment.
19. Open the public Northflank URL and test:

```bash
curl https://YOUR-NORTHFLANK-PUBLIC-URL/api/health
```

Expected response:

```json
{"status":"ok"}
```

20. In Vercel, update the frontend environment variable:

```text
VITE_API_URL=https://YOUR-NORTHFLANK-PUBLIC-URL
```

Use the Northflank service origin only, with no trailing slash. Redeploy the Vercel frontend after changing it.

21. Test the deployed frontend flows:
    - Sign up
    - Sign in
    - Current user load through `GET /users/me`
    - Save article through `POST /articles`
    - Load saved articles through `GET /articles`
    - Delete saved article through `DELETE /articles/{id}`

## Local Validation Commands

From the repository root:

```bash
cd backend
mvn test
mvn package
docker build -t newsexplorer-backend:northflank .
docker run --rm -p 8080:8080 \
  -e PORT=8080 \
  -e DB_URL=jdbc:postgresql://HOST:5432/newsexplorer \
  -e DB_USERNAME=YOUR_DB_USERNAME \
  -e DB_PASSWORD=YOUR_DB_PASSWORD \
  -e JWT_SECRET=YOUR_32_BYTE_OR_LONGER_SECRET \
  -e JWT_EXPIRATION_MS=86400000 \
  -e ALLOWED_ORIGIN=https://news-explorer-ten.vercel.app \
  -e JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=70.0 -XX:InitialRAMPercentage=20.0 -XX:+UseSerialGC" \
  newsexplorer-backend:northflank
```

The local `docker run` command needs reachable PostgreSQL credentials. Use placeholders in documentation and real values only in your local shell or Northflank runtime variables.

## References

- Northflank combined services: https://northflank.com/docs/v1/application/getting-started/build-and-deploy-your-code
- Northflank Dockerfile builds: https://northflank.com/docs/v1/application/build/build-with-a-dockerfile
- Northflank runtime variables: https://northflank.com/docs/v1/application/run/inject-runtime-variables
- Northflank ports: https://northflank.com/docs/v1/application/network/configure-ports
- Northflank health checks: https://northflank.com/docs/v1/application/observe/configure-health-checks
- Northflank pricing and free tier: https://northflank.com/pricing
