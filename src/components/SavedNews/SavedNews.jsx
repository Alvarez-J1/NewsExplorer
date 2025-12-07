import "./SavedNews.css";

import { NavLink } from "react-router-dom";
import { useState } from "react";

import savedmenuIcon from "../../assets/savednews__menu-icon.svg";
import blackLogoutImg from "../../assets/black_logout.svg";
import whiteLogoutImg from "../../assets/white_logout.svg";
import NewsCard from "../NewsCard/NewsCard";
import linkedin from "../../assets/LinkedIn.svg";
import github from "../../assets/github.svg";
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
                `savednews__header-saved-articles savednews__header-saved-articles--under ${
                  isActive ? "savednews__header-saved-articles--active" : ""
                }`
              }
              style={{ textDecoration: "none" }}
            >
              Saved articles
            </NavLink>
            <NavLink className="savednews__header-username-nav" to="/">
              <button
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
          {/* MOBILE HAMBURGER BUTTON */}
          {!isAnyModalOpen && (
            <button
              className="savednews__header-menu-btn"
              onClick={handleOpenMenu}
            >
              <img src={savedmenuIcon} alt="Open menu" />
            </button>
          )}
        </div>
      </header>
      {/* MOBILE MENU MODAL */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu__overlay" onClick={handleCloseMenu} />
          <div className="mobile-menu__panel">
            <div className="mobile-menu__top">
              <div className="mobile-menu__section">
                <p className="mobile-menu__title">NewsExplorer</p>
              </div>
              {isMobileMenuOpen && (
                <button
                  className="mobile-menu__close-btn"
                  onClick={handleCloseMenu}
                >
                  <img src={savednewscloseIcon} alt="Close" />
                </button>
              )}
            </div>
            <nav className="mobile-menu__nav">
              <NavLink
                to="/"
                className="savednews__header-link-mobile"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  `savednews__header-saved-articles-mobile savednews__header-saved-articles--under ${
                    isActive ? "savednews__header-saved-articles--active" : ""
                  }`
                }
                style={{ textDecoration: "none" }}
              >
                Saved articles
              </NavLink>
              <button
                className="savednews__mobileheader-signout-btn"
                onClick={onLogout}
              >
                <span className="savednews__header-username">{firstname}</span>
                <img
                  className="savednews__header-logout-icon"
                  src={whiteLogoutImg}
                  alt="logout-icon"
                />
              </button>
            </nav>
          </div>
        </div>
      )}
      <section className="savednews__info">
        <h2 className="savednews__info-title">Saved articles</h2>
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
      </section>
      <section className="savednews__footer">
        <p className="savednews__footer-supersite">
          © 2025 Supersite, Powered by News API
        </p>
        <div className="savednews__footer-top-row">
          <nav className="savednews__footer-nav">
            <NavLink to="/" className="savednews__footer-home">
              Home
            </NavLink>

            <a
              href="https://tripleten.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="savednews__footer-tripleten"
            >
              TripleTen
            </a>
          </nav>

          <div className="savednews__footer-icons">
            <a
              href="https://github.com/Alvarez-J1/news-explorer-frontend/tree/stage-1-frontend-and-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={github}
                className="savednews__footer-github"
                alt="github"
              ></img>
            </a>
            <a
              href="https://www.linkedin.com/in/joel-alvarez-80000732a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedin}
                className="savednews__footer-linkedin"
                alt="linkedIn"
              ></img>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
