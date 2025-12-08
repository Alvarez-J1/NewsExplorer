import "./Header.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

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

  const handleOpenMenu = () => setIsMobileMenuOpen(true);
  const handleCloseMenu = () => setIsMobileMenuOpen(false);

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

                <button className="header__signout-btn" onClick={onLogout}>
                  <span className="header__username">
                    {currentUser?.name?.split(" ")[0]}
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

                <button className="header__signin-btn" onClick={onLoginClick}>
                  Sign in
                </button>
              </nav>
            </>
          )}
          {/* MOBILE HAMBURGER BUTTON */}
          {!isAnyModalOpen && (
            <button className="header__menu-btn" onClick={handleOpenMenu}>
              <img src={menuIcon} alt="Open menu" />
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
                  <img src={closeIcon} alt="Close" />
                </button>
              )}
            </div>

            <nav className="mobile-menu__nav">
              <NavLink
                to="/"
                className="header__link-mobile"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              {!isLoggedIn && (
                <button
                  type="button"
                  className="mobile-menu__signin-btn"
                  onClick={() => {
                    onLoginClick();
                    handleCloseMenu();
                  }}
                >
                  Sign in
                </button>
              )}

              {isLoggedIn && (
                <>
                  <NavLink
                    className="mobile-menu__saved-articles"
                    to="/saved-news"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Saved articles
                  </NavLink>

                  <button
                    className="mobile-menu__logout"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                  >
                    {currentUser.name.split(" ")[0]}
                    <img src={logoutImg} alt="logout" />
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
