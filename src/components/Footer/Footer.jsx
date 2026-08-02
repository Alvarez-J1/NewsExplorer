import "./Footer.css";

import { Link, useLocation } from "react-router-dom";
import { getPreferredScrollBehavior } from "../../utils/motion";

export default function Footer() {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";
  const scrollToPageTop = () => {
    window.scrollTo({ top: 0, behavior: getPreferredScrollBehavior() });
  };
  const handleHomeNavigation = (e) => {
    if (isHomeRoute) {
      e.preventDefault();
    }

    window.setTimeout(scrollToPageTop, 0);
  };

  return (
    <footer className="footer">
      <div className="footer__brand">
        <Link
          to="/"
          className="footer__logo"
          onClick={handleHomeNavigation}
          aria-label="NewsExplorer home"
        >
          NewsExplorer
        </Link>
        <p className="footer__tagline">
          Search, scan, and save the stories worth reading.
        </p>
        <p className="footer__supersite">
          &copy; 2025 NewsExplorer. Powered by News API.
        </p>
      </div>

      <div className="footer__links" aria-label="Footer navigation">
        <nav className="footer__group" aria-label="Explore">
          <p className="footer__group-title">Explore</p>
          <Link to="/" className="footer__link" onClick={handleHomeNavigation}>
            Home
          </Link>
          <span className="footer__link footer__link--inactive">
            Trending
          </span>
          <span className="footer__link footer__link--inactive">
            Categories
          </span>
        </nav>

        <nav className="footer__group" aria-label="Platform">
          <p className="footer__group-title">Platform</p>
          <span className="footer__link footer__link--inactive">
            About
          </span>
          <span className="footer__link footer__link--inactive">
            Contact
          </span>
          <a
            href="https://newsapi.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="News API website (opens in a new tab)"
          >
            News API
          </a>
        </nav>

        <nav className="footer__group" aria-label="Legal">
          <p className="footer__group-title">Legal</p>
          <span className="footer__link footer__link--inactive">
            Privacy
          </span>
          <span className="footer__link footer__link--inactive">
            Terms
          </span>
        </nav>
      </div>

    </footer>
  );
}
