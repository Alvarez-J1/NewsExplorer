import "./Header.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import menuIcon from "../../assets/menuIcon.svg";
import logoutImg from "../../assets/white_logout.svg";
import closeIcon from "../../assets/close-mobile.svg";

export default function Header({
  onLoginClick,
  isLoggedIn,
  currentUser,
  onLogout,
  isAnyModalOpen,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const firstname = currentUser?.name?.split?.(" ")[0] ?? "User";

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
      <header className="header">
        <div className="header__left">
          <p className="header__title">NewsExplorer</p>
        </div>

        <div className="header__right">
          {isLoggedIn ? (
            // Logged IN state
            <>
              <nav className="header__nav header__nav--logged-in">
                <NavLink to="/" className="header__link header__link--under">
                  Home
                </NavLink>

                <NavLink
                  to="/saved-news"
                  className={({ isActive }) =>
                    `header__saved-articles ${
                      isActive ? "header__saved-articles--active" : ""
                    }`
                  }
                  style={{ textDecoration: "none" }}
                >
                  Saved articles
                </NavLink>

                <button
                  type="button"
                  className="header__signout-btn"
                  onClick={onLogout}
                >
                  <span className="header__username">
                    {firstname}
                  </span>
                  <img
                    className="header__logout-icon"
                    src={logoutImg}
                    alt="logout-icon"
                  />
                </button>
              </nav>
            </>
          ) : (
            // Logged OUT state
            <>
              <nav className="header__nav header__nav--logged-out">
                <NavLink to="/" className="header__link header__link--under">
                  Home
                </NavLink>

                <button
                  type="button"
                  className="header__signin-btn"
                  onClick={onLoginClick}
                >
                  Sign in
                </button>
              </nav>
            </>
          )}
          {/* MOBILE HAMBURGER BUTTON */}
          {!isAnyModalOpen && (
            <button
              type="button"
              className="header__menu-btn"
              onClick={handleOpenMenu}
              aria-label="Open menu"
              aria-controls="main-mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <img src={menuIcon} alt="" />
            </button>
          )}
        </div>
      </header>

      {/* MOBILE MENU MODAL */}
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
          <div className="mobile-menu__panel" id="main-mobile-menu">
            <div className="mobile-menu__top">
              <div className="mobile-menu__section">
                <p className="mobile-menu__title">NewsExplorer</p>
              </div>
              {isMobileMenuOpen && (
                <button
                  type="button"
                  className="mobile-menu__close-btn"
                  onClick={handleCloseMenu}
                  aria-label="Close menu"
                >
                  <img src={closeIcon} alt="" />
                </button>
              )}
            </div>

            <nav className="mobile-menu__nav">
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  `header__link-mobile mobile-menu__link ${
                    isActive ? "mobile-menu__link--active" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>

              {isLoggedIn && (
                <NavLink
                  className={({ isActive }) =>
                    `mobile-menu__saved-articles mobile-menu__link ${
                      isActive ? "mobile-menu__link--active" : ""
                    }`
                  }
                  to="/saved-news"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Saved articles
                </NavLink>
              )}
            </nav>

            {!isLoggedIn ? (
              <div className="mobile-menu__account mobile-menu__account--guest">
                <button
                  type="button"
                  className="mobile-menu__signin-action"
                  onClick={() => {
                    onLoginClick();
                    handleCloseMenu();
                  }}
                >
                  Sign in
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </>
  );
}
