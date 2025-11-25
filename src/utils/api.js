// Simulate getting saved articles from database
export function getItems() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          _id: "65f7368dfb74bd6a92114c85",
          title: "Sample Saved Article 1",
          description: "This is a fake saved article for testing",
          url: "https://example.com/article1",
          urlToImage: "https://via.placeholder.com/400x200",
          publishedAt: "2024-01-15T10:30:00Z",
          source: { name: "Example News" },
          keyword: "technology",
        },
        {
          _id: "65f7371e7bce9e7d331b11a0",
          title: "Sample Saved Article 2",
          description: "Another fake saved article for testing",
          url: "https://example.com/article2",
          urlToImage: "https://via.placeholder.com/400x200",
          publishedAt: "2024-01-14T15:45:00Z",
          source: { name: "Tech Daily" },
          keyword: "science",
        },
      ]);
    }, 800);
  });
}

// Simulate saving an article to database
export function saveArticle(article) {
  return new Promise((resolve, reject) => {
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
export function deleteArticle(articleId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: "Article deleted successfully" });
    }, 500);
  });
}
