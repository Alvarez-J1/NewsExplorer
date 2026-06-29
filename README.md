# NewsExplorer

NewsExplorer is a full-stack application that allows users to search for news articles by keyword and browse the latest headlines through a clean, responsive interface. Users can create an account, save articles to their personal collection, and easily manage their saved stories from a dedicated dashboard.

<img width="1906" height="916" alt="image" src="https://github.com/user-attachments/assets/5c094dc7-55e9-4a8c-b8be-3ba87291971d" />

## Live Demo

Deployed app: https://news-explorer-ten.vercel.app/

## Features

- Search news articles by keyword
- View search results and load more with **“Show more”** button
- User authentication (sign up / sign in modals)
- Save / unsave articles (bookmark icon)
- Saved articles page:
- Shows total number of saved articles
- Displays keyword summary
- Allows removing saved articles
- Fully responsive layout for mobile, tablet, and desktop

## Tech Stack

### Frontend
- **React** + **Vite**
- **React Router** (SPA navigation)
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3 / Flexbox / Responsive Design**
- **BEM** methodology for CSS class naming

### Backend
- **Java 21**
- **Spring Boot 3**
- **Spring Web**
- **Spring Security**
- **JWT Authentication**
- **BCrypt** (password hashing)
- **Spring Data JPA / Hibernate**
- **PostgreSQL**
- **Maven**

### Deployment & Tools
- **Docker**
- **Render**
- **ESLint**

## Screenshots

## Desktop View

<img width="1906" height="916" alt="image" src="https://github.com/user-attachments/assets/5c094dc7-55e9-4a8c-b8be-3ba87291971d" />

## Mobile View

## <img width="404" height="753" alt="image" src="https://github.com/user-attachments/assets/b34db160-5c5a-4559-9c8d-b6755aa97bd5" />

## How to Download the Project

Clone the repository to your computer:

```bash
git clone https://github.com/Alvarez-J1/NewsExplorer
cd NewsExplorer
```

## How to Install Dependencies

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values (never commit `.env.local`):

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | For auth | Backend API base URL with no trailing slash. Local default: `http://localhost:3001` |
| `VITE_NEWS_API_KEY` | For search | NewsAPI key from [newsapi.org](https://newsapi.org/) |
| `VITE_USE_MOCK` | No | Set to `true` to use mock search results instead of the News API |

On **Vercel**, add the same variables under Project Settings → Environment Variables, then redeploy. Without `VITE_API_URL`, sign-in and sign-up requests will fail in production.

## How to Start the App Locally

```bash
npm run dev
```

After running the command, open the URL shown in your terminal (default: http://localhost:3000/).

For authentication to work locally, also run the backend — see [backend/README.md](backend/README.md).

## Deploying the Backend

The Spring Boot API can be deployed to Render using the root `render.yaml` blueprint and `backend/Dockerfile`. See [backend/README.md](backend/README.md) for setup, environment variables, and deployment steps.

The backend exposes a lightweight public `/health` endpoint for platform health checks and demo warm-up probes. Render free services can cold-start after idle periods, so recruiter-facing demos are smoother with periodic `/health` monitoring or a backend plan with fewer cold starts.

## Project Structure

```text
NewsExplorer/
├── .env.example              # Frontend env template (safe to commit)
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── render.yaml               # Render deployment blueprint (backend + Postgres)
├── vite.config.js
│
├── public/
│   ├── favicon.svg
│   └── vite.svg
│
├── src/                      # React frontend
│   ├── main.jsx              # App entry point
│   ├── index.css             # Global styles
│   │
│   ├── assets/               # Images, icons, SVGs
│   │
│   ├── components/
│   │   ├── About/
│   │   ├── App/              # Main app shell + routing
│   │   ├── Footer/
│   │   ├── Header/           # Nav + mobile menu
│   │   ├── LoginModal/
│   │   ├── Main/             # Home / search page
│   │   ├── ModalWithForm/
│   │   ├── Navigation/
│   │   ├── NewsCard/
│   │   ├── Preloader/
│   │   ├── RegisterModal/
│   │   ├── SavedNews/        # Saved articles page
│   │   ├── SearchForm/
│   │   ├── SearchResults/
│   │   └── SuccessModal/
│   │
│   ├── hooks/
│   │   └── useForm.js
│   │
│   ├── utils/
│   │   ├── adapter.js        # Article data formatting
│   │   ├── api.js            # Saved articles API calls
│   │   ├── auth.js           # Sign in / sign up / token check
│   │   ├── constants.js      # API base URL
│   │   └── newsApi.js        # News search API
│   │
│   └── vendor/
│       ├── fonts.css
│       └── fonts/            # Roboto, Inter, Roboto Slab
│
└── backend/                  # Spring Boot API
    ├── .dockerignore
    ├── .env.example          # Backend env template (safe to commit)
    ├── Dockerfile
    ├── pom.xml
    ├── README.md
    │
    └── src/main/
        ├── java/com/newsexplorer/backend/
        │   ├── NewsExplorerApplication.java
        │   │
        │   ├── config/
        │   │   └── SecurityConfig.java
        │   │
        │   ├── controller/
        │   │   ├── AuthController.java      # /signup, /signin
        │   │   ├── UserController.java      # /users/me
        │   │   ├── ArticleController.java   # /articles
        │   │   └── HealthController.java    # /health
        │   │
        │   ├── dto/                         # Request/response models
        │   ├── entity/                      # User, Article DB models
        │   ├── exception/                   # Error handling
        │   ├── repository/                # JPA repositories
        │   ├── security/                    # JWT auth
        │   └── service/                     # Business logic
        │
        └── resources/
            └── application.properties       # DB, JWT, CORS config
```

## Author

Joel Alvarez
