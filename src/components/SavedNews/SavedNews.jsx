import "./SavedNews.css";

import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import savedmenuIcon from "../../assets/savednews__menu-icon.svg";
import NewsCard from "../NewsCard/NewsCard";
import Footer from "../Footer/Footer";
import savednewscloseIcon from "../../assets/close-mobile.svg";
import { getPreferredScrollBehavior } from "../../utils/motion";

const getSavedArticleKey = (article, index) =>
  article.id ??
  article._id ??
  article.url ??
  [article.title, article.source, article.publishedAt, index]
    .filter(Boolean)
    .join("-");

export default function SavedNews({
  currentUser,
  onLogout,
  savedArticles = [],
  isSavedArticlesLoading = false,
  onUnsaveArticle,
  isAnyModalOpen,
}) {
  const firstname = currentUser?.name?.split?.(" ")[0] ?? "User";
  const count = savedArticles.length;
  const articleWord = count === 1 ? "saved article" : "saved articles";
  const all = savedArticles.map((a) => a.keyword).filter(Boolean);
  const uniq = Array.from(new Set(all));
  const [k1, k2, ...rest] = uniq;
  const extra = rest.length;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMenuButtonRef = useRef(null);

  const handleOpenMenu = () => setIsMobileMenuOpen(true);
  const handleCloseMenu = () => setIsMobileMenuOpen(false);
  const scrollToPageTop = () => {
    window.scrollTo({ top: 0, behavior: getPreferredScrollBehavior() });
  };
  const handleHomeNavigation = () => {
    window.setTimeout(scrollToPageTop, 0);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const scrollY = window.scrollY;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    closeMenuButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.documentElement.style.overflow = originalDocumentOverflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="savednews__header">
        <div className="savednews__header-left">
          <Link
            to="/"
            className="savednews__header-title"
            onClick={handleHomeNavigation}
            aria-label="NewsExplorer home"
          >
            NewsExplorer
          </Link>
        </div>
        <div className="savednews__header-right">
          <nav
            className="savednews__header-nav"
            aria-label="Saved articles navigation"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `savednews__header-link ${
                  isActive ? "savednews__header-link--under" : ""
                }`
              }
              onClick={handleHomeNavigation}
            >
              Home
            </NavLink>

            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `savednews__header-saved-articles ${
                  isActive ? "savednews__header-saved-articles--active" : ""
                }`
              }
              style={{ textDecoration: "none" }}
            >
              Saved articles
            </NavLink>
            <button
              type="button"
              className="savednews__header-signout-btn"
              onClick={onLogout}
            >
              Sign out
            </button>
          </nav>
          {!isAnyModalOpen && (
            <button
              type="button"
              className="savednews__header-menu-btn"
              onClick={handleOpenMenu}
              aria-label="Open menu"
              aria-controls="savednews-mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <img src={savedmenuIcon} alt="" aria-hidden="true" />
            </button>
          )}
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="savednews-mobile-menu-title"
        >
          <button
            type="button"
            className="mobile-menu__overlay"
            onClick={handleCloseMenu}
            aria-label="Close menu"
          />
          <div className="mobile-menu__panel" id="savednews-mobile-menu">
            <div className="mobile-menu__top">
              <div className="mobile-menu__section">
                <p className="mobile-menu__title" id="savednews-mobile-menu-title">
                  NewsExplorer
                </p>
              </div>
              <button
                type="button"
                className="mobile-menu__close-btn"
                ref={closeMenuButtonRef}
                onClick={handleCloseMenu}
                aria-label="Close menu"
              >
                <img src={savednewscloseIcon} alt="" aria-hidden="true" />
              </button>
            </div>
            <nav
              className="mobile-menu__nav"
              aria-label="Saved articles mobile navigation"
            >
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  `savednews__header-link-mobile mobile-menu__link ${
                    isActive ? "mobile-menu__link--active" : ""
                  }`
                }
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.setTimeout(scrollToPageTop, 80);
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  `savednews__header-saved-articles-mobile mobile-menu__link ${
                    isActive ? "mobile-menu__link--active" : ""
                  }`
                }
                style={{ textDecoration: "none" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Saved articles
              </NavLink>
            </nav>

            <div className="mobile-menu__account" aria-label="Account">
              <p className="mobile-menu__account-label">Signed in as</p>
              <p className="mobile-menu__account-name">{firstname}</p>
              <button
                type="button"
                className="mobile-menu__signout-action"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout();
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="savednews__info">
        <p className="savednews__info-title">Saved library</p>
        <p className="savednews__info-count">
          {firstname} you have {count} {articleWord}
        </p>
        {uniq.length > 0 && (
          <p className="savednews__info-keywords">
            By keywords:&nbsp;
            <span className="savednews__info-keywords-list">
              {k1}
              {k2 ? `, ${k2}` : ""}
              {extra ? `, and ${extra} other` : ""}
            </span>
          </p>
        )}
      </section>

      <section
        className="savednews__cards"
        aria-label="Saved articles"
        aria-busy={isSavedArticlesLoading}
      >
        {isSavedArticlesLoading ? (
          <ul className="savednews__skeleton-grid" aria-label="Loading saved articles">
            {[0, 1, 2].map((item) => (
              <li className="savednews__skeleton-card" key={item}>
                <span className="savednews__skeleton-media" />
                <span className="savednews__skeleton-line savednews__skeleton-line--wide" />
                <span className="savednews__skeleton-line" />
                <span className="savednews__skeleton-line savednews__skeleton-line--short" />
              </li>
            ))}
          </ul>
        ) : savedArticles.length > 0 ? (
          <ul className="results__grid">
            {savedArticles.map((a, index) => (
              <NewsCard
                key={getSavedArticleKey(a, index)}
                item={a}
                isLoggedIn={true}
                saved={true}
                onUnsave={() => onUnsaveArticle(a)}
                isSavedPage={true}
              />
            ))}
          </ul>
        ) : (
          <div className="savednews__empty">
            <p className="savednews__empty-eyebrow">No saved articles yet</p>
            <h2 className="savednews__empty-title">
              Build a reading list as you explore.
            </h2>
            <p className="savednews__empty-text">
              Save stories from search results and they will appear here with
              their topics and sources.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
