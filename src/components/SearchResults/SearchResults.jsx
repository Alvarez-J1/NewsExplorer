import NewsCard from "../NewsCard/NewsCard";
import "./SearchResults.css";

const getSearchArticleKey = (article, index) =>
  article.id ??
  article._id ??
  article.url ??
  [article.title, article.source, article.publishedAt, index]
    .filter(Boolean)
    .join("-");

export default function SearchResults({
  items = [],
  visibleCards = 3,
  onShowMore,
  isLoggedIn,
  openLoginModal,
  onSaveArticle,
  onUnsaveArticle,
  savedArticles = [],
  searchQuery,
  isLoadingMore = false,
}) {
  const visible = items.slice(0, visibleCards);

  const allShown = visibleCards >= items.length;
  const showMoreLabel = isLoadingMore
    ? "Loading more search results"
    : allShown
    ? "All search results shown"
    : "Show more search results";

  return (
    <section className="results" aria-labelledby="search-results-title">
      <div className="results__header">
        <p className="results__eyebrow">Latest coverage</p>
        <h2 className="results__title" id="search-results-title">
          Search results
        </h2>
        <p className="results__summary" aria-live="polite" aria-atomic="true">
          {items.length} {items.length === 1 ? "article" : "articles"} matched
          your search.
        </p>
      </div>
      <ul className="results__grid">
        {visible.map((a, i) => (
          <NewsCard
            key={getSearchArticleKey(a, i)}
            item={a}
            isLoggedIn={isLoggedIn}
            onRequireLogin={openLoginModal}
            onSave={() => onSaveArticle({ ...a, keyword: searchQuery })}
            onUnsave={() => onUnsaveArticle(a)}
            saved={savedArticles.some((s) => s.url === a.url)} // pre-blue if saved
            className="results__item"
          />
        ))}
      </ul>
      {items.length > 0 && (
        <button
          className="results__more"
          type="button"
          onClick={onShowMore}
          disabled={allShown || isLoadingMore}
          aria-label={showMoreLabel}
        >
          {isLoadingMore
            ? "Loading..."
            : allShown
            ? "All results shown"
            : "Show more"}
        </button>
      )}
    </section>
  );
}
