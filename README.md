# NewsExplorer – Frontend

## Description:

NewsExplorer is a React application that lets users search for news articles by keyword and save them to their personal account. This repo contains the frontend part of the final TripleTen project.

## Live Demo

Deployed app: **https://alvarez-j1.github.io/news-explorer-frontend/**

## Tech Stack

- **React** + **Vite**
- **React Router** (SPA navigation)
- **JavaScript (ES6+)**
- **CSS3 / Flexbox / Responsive layout**
- **BEM** methodology for CSS class naming
- **ESLint** (code style & linting)
- Deployment: **GitHub Pages**

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

## How to Download the Project

Clone the repository to your computer:

```bash
git clone https://github.com/Alvarez-J1/news-explorer-frontend.git
cd news-explorer-frontend
```

## How to Install Dependencies

npm install

## How to Start the App Locally

npm run dev

After running the command, open the URL shown in your terminal
(usually something like http://localhost:5173/).

## How to Build the App

npm run build

This creates a production-ready version in the dist folder.

## How to Deploy the App (GitHub Pages)

This project uses Vite and gh-pages for deployment.

Make sure all changes are committed:

git add -A
git commit -m "final changes"
git push

Deploy the website:

npm run deploy

This will publish your dist folder to the gh-pages branch and update the live app at:

👉 https://alvarez-j1.github.io/news-explorer-frontend/
