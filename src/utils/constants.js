const LOCAL_API_URL = "http://localhost:3001";
const PRODUCTION_API_URL = "https://newsexplorer-backend-m82y.onrender.com";
const STALE_API_URLS = new Set([
  "https://p01--newsexplorer-backend--b9kg7b7ghjqh.code.run",
  "https://news-explorer-backend124.onrender.com",
]);

const configuredApiUrl = import.meta.env.VITE_API_URL;

export const BASE_URL =
  import.meta.env.PROD &&
  (!configuredApiUrl || STALE_API_URLS.has(configuredApiUrl))
    ? PRODUCTION_API_URL
    : configuredApiUrl || LOCAL_API_URL;
