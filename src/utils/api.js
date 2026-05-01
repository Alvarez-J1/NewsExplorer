import { BASE_URL } from "./constants";

function getArticles() {
  return fetch(`${BASE_URL}/articles`).then(processResponse);
}

// Simulate saving an article to database
export function saveArticle(article, keyword) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        _id: "65f7371e7bce9e7d331b11a0", // fake MongoDB ID
        url: article.url,
        title: article.title,
        description: article.description,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source,
        keyword: keyword, // you'll need to pass this from your search
      });
    }, 1000);
  });
}

// Simulate removing an article from database
export function deleteArticle() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Article deleted successfully" });
    }, 500);
  });
}

export function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
