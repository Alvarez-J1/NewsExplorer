# NewsExplorer

NewsExplorer is a React application that lets users search for news articles by keyword and save them to their personal account.

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

- **React** + **Vite**
- **React Router** (SPA navigation)
- **JavaScript (ES6+)**
- **HTML**
- **CSS3 / Flexbox / Responsive layout**
- **BEM** methodology for CSS class naming
- **ESLint** (code style & linting)

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

## Project Structure

```text
news-explorer-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── icons and SVG assets
│   │   └── image assets
│   ├── components/
│   │   ├── About/
│   │   ├── App/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── LoginModal/
│   │   ├── Main/
│   │   ├── ModalWithForm/
│   │   ├── Navigation/
│   │   ├── NewsCard/
│   │   ├── Preloader/
│   │   ├── RegisterModal/
│   │   ├── SavedNews/
│   │   ├── SearchForm/
│   │   ├── SearchResults/
│   │   └── SuccessModal/
│   ├── hooks/
│   │   └── useForm.js
│   ├── utils/
│   │   ├── adapter.js
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── constants.js
│   │   └── newsApi.js
│   ├── vendor/
│   │   ├── fonts/
│   │   └── fonts.css
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Author

Joel Alvarez
