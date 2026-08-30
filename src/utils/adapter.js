export const toCardModel = (article) => {
  const safeArticle = article ?? {};

  return {
    id: safeArticle._id ?? safeArticle.id ?? safeArticle.url, // stable identity
    url: safeArticle.url,
    title: safeArticle.title ?? "Untitled",
    text: safeArticle.description ?? safeArticle.text ?? "",
    image: safeArticle.urlToImage ?? safeArticle.image ?? "",
    date: safeArticle.publishedAt ?? safeArticle.date ?? new Date().toISOString(),
    source:
      typeof safeArticle.source === "string"
        ? safeArticle.source
        : safeArticle.source?.name ?? "Unknown source",
    keyword: safeArticle.keyword ?? "",
  };
};
