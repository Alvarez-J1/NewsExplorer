export const toCardModel = (a) => ({
  id: a._id ?? a.id ?? a.url, // stable identity
  url: a.url,
  title: a.title ?? "Untitled",
  text: a.description ?? a.text ?? "",
  image: a.urlToImage ?? a.image ?? "",
  date: a.publishedAt ?? a.date ?? new Date().toISOString(),
  source: typeof a.source === "string" ? a.source : a.source?.name ?? "Unknown",
  keyword: a.keyword ?? "",
});
