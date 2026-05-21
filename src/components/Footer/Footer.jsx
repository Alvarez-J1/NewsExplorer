import "./Footer.css";

import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <p className="footer__logo">NewsExplorer</p>
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
          <NavLink to="/" className="footer__link">
            Home
          </NavLink>
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
