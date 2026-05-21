# NewsExplorer

NewsExplorer is a React application that lets users search for news articles by keyword and save them to their personal account.

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

npm install

## How to Start the App Locally

npm run dev

After running the command, open the URL shown in your terminal
(usually something like http://localhost:5173/).

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
