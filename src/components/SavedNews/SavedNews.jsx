import "./SavedNews.css";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import savedmenuIcon from "../../assets/savednews__menu-icon.svg";
import blackLogoutImg from "../../assets/black_logout.svg";
import NewsCard from "../NewsCard/NewsCard";
import Footer from "../Footer/Footer";
import savednewscloseIcon from "../../assets/close-mobile.svg";

export default function SavedNews({
  currentUser,
  onLogout,
  savedArticles = [],
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

  const handleOpenMenu = () => setIsMobileMenuOpen(true);
  const handleCloseMenu = () => setIsMobileMenuOpen(false);

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
          <p className="savednews__header-title">NewsExplorer</p>
        </div>
        <div className="savednews__header-right">
          <nav className="savednews__header-nav">
            <NavLink
              to="/"
              className="savednews__header-link savednews__header-link--under"
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
            <NavLink className="savednews__header-username-nav" to="/">
              <button
                type="button"
                className="savednews__header-signout-btn"
                onClick={onLogout}
              >
                <span className="savednews__header-username">{firstname}</span>
                <img
                  className="savednews__header-logout-icon"
                  src={blackLogoutImg}
                  alt="logout-icon"
                />
              </button>
            </NavLink>
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
              <img src={savedmenuIcon} alt="" />
            </button>
          )}
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
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
                <p className="mobile-menu__title">NewsExplorer</p>
              </div>
              <button
                type="button"
                className="mobile-menu__close-btn"
                onClick={handleCloseMenu}
                aria-label="Close menu"
              >
                <img src={savednewscloseIcon} alt="" />
              </button>
            </div>
            <nav className="mobile-menu__nav">
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  `savednews__header-link-mobile mobile-menu__link ${
                    isActive ? "mobile-menu__link--active" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
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

      <section className="savednews__cards">
        {savedArticles.length > 0 ? (
          <ul className="results__grid">
            {savedArticles.map((a) => (
              <NewsCard
                key={a.url}
                item={a}
                isLoggedIn={true}
                currentUser={currentUser}
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
