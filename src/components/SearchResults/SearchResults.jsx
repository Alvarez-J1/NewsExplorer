import NewsCard from "../NewsCard/NewsCard";
import "./SearchResults.css";

export default function SearchResults({
  items = [],
  visibleCards = 3,
  onShowMore,
  isLoggedIn,
  currentUser,
  openLoginModal,
  onSaveArticle,
  onUnsaveArticle,
  savedArticles = [],
  searchQuery,
  isLoadingMore = false,
}) {
  const visible = items.slice(0, visibleCards);

  const allShown = visibleCards >= items.length;

  return (
    <section className="results">
      <div className="results__header">
        <p className="results__eyebrow">Latest coverage</p>
        <h2 className="results__title">Search results</h2>
        <p className="results__summary">
          {items.length} {items.length === 1 ? "article" : "articles"} matched
          your search.
        </p>
      </div>
      <ul className="results__grid">
        {visible.map((a, i) => (
          <NewsCard
            key={a.url || a.id || i}
            item={a}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
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
