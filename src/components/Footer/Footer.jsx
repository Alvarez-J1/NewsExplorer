import "./Footer.css";

import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";
  const scrollToPageTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <a href="#" className="footer__link">
            Trending
          </a>
          <a href="#" className="footer__link">
            Categories
          </a>
        </nav>

        <nav className="footer__group" aria-label="Platform">
          <p className="footer__group-title">Platform</p>
          <a href="#" className="footer__link">
            About
          </a>
          <a href="#" className="footer__link">
            Contact
          </a>
          <a
            href="https://newsapi.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            News API
          </a>
        </nav>

        <nav className="footer__group" aria-label="Legal">
          <p className="footer__group-title">Legal</p>
          <a href="#" className="footer__link">
            Privacy
          </a>
          <a href="#" className="footer__link">
            Terms
          </a>
        </nav>
      </div>

    </footer>
  );
}
