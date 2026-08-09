import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchResults from "../SearchResults/SearchResults";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import notFound from "../../assets/not-found.svg";
export default function Main({
  onLoginClick,
  onSearch,
  results,
  hasSearched,
  isLoading,
  error,
  visibleCards,
  onShowMore,
  onLogout,
  isLoggedIn,
  currentUser,
  savedArticles,
  onSaveArticle,
  onUnsaveArticle,
  isAnyModalOpen,
  isLoadingMore,
  searchQuery,
}) {
  const [params] = useSearchParams();
  const q = params.get("q")?.trim() || "";

  useEffect(() => {
    // If user lands directly on /results?q=..., trigger search once
    if (q && !hasSearched) onSearch(q);
  }, [q, hasSearched, onSearch]);

  return (
    <>
      <div className="page-wrapper">
        <div className="hero-wrap">
          <Header
            onLoginClick={onLoginClick}
            onLogout={onLogout}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            isAnyModalOpen={isAnyModalOpen}
          />
          <main className="main">
            <section className="main__hero">
              <h1 className="main__hero-title">
                Track the stories shaping the world.
              </h1>
              <p className="main__hero-subtitle">
              A cleaner way to search, read, and revisit trusted reporting.
              </p>
              <SearchForm onSearch={onSearch} />
            </section>
          </main>
        </div>
        {isLoading && <Preloader />}
        {!isLoading && hasSearched && results.length > 0 && (
          <SearchResults
            items={results}
            visibleCards={visibleCards}
            onShowMore={onShowMore}
            isLoggedIn={isLoggedIn}
            openLoginModal={onLoginClick}
            savedArticles={savedArticles}
            onSaveArticle={onSaveArticle}
            onUnsaveArticle={onUnsaveArticle}
            searchQuery={searchQuery}
            isLoadingMore={isLoadingMore}
          />
        )}
        {!isLoading && hasSearched && !error && results.length === 0 && (
          <section
            className="results-empty"
            aria-labelledby="results-empty-title"
          >
            <img
              src={notFound}
              className="results-empty__img"
              alt=""
              aria-hidden="true"
            />
            <h2 className="results-empty__title" id="results-empty-title">
              Nothing found
            </h2>
            <p className="results-empty__text">
              Sorry, but nothing matched your search terms.
            </p>
          </section>
        )}
        {!isLoading && hasSearched && error && (
          <section className="results-error">
            <p className="results-error__eyebrow">Request failed</p>
            <h2 className="results-error__title">Error</h2>
            <p className="results-error__text">{error}</p>
          </section>
        )}

        <section className="about__separator">
          <About />
          <Footer />
        </section>
      </div>
    </>
  );
}
