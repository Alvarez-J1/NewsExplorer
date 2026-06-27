import { BASE_URL } from "./constants";

/**
 * GET /articles
 * Returns the current user's saved articles.
 */
export function getArticles(token) {
  return fetch(`${BASE_URL}/articles`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(processResponse);
}

/**
 * POST /articles
 * Saves an article for the current user.
 * Returns the created article object (with _id).
 */
export function saveArticle(article, keyword, token) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: article.url,
      title: article.title,
      description: article.description || article.text,
      urlToImage: article.urlToImage || article.image,
      publishedAt: article.publishedAt || article.date,
      source:
        typeof article.source === "string"
          ? article.source
          : article.source?.name ?? "Unknown",
      keyword,
    }),
  }).then(processResponse);
}

/**
 * DELETE /articles/{id}
 * Removes a saved article by its server-side id.
 */
export function deleteArticle(articleId, token) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(processResponse);
}

// ── helpers ────────────────────────────────────────────────────────────────

export function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((body) => {
    return Promise.reject(new Error(body.message || `Error ${res.status}`));
  });
}
