import "./Footer.css";
import linkedin from "../../assets/LinkedIn.svg";
import github from "../../assets/github.svg";

import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__supersite">© 2025 Supersite, Powered by News API</p>

      <div className="footer__top-row">
        <nav className="footer__nav">
          <NavLink to="/" className="footer__nav-home">
            Home
          </NavLink>

          <a
            href="https://tripleten.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__nav-tripleten"
          >
            TripleTen
          </a>
        </nav>

        <div className="footer__icons">
          <a
            href="https://github.com/Alvarez-J1/news-explorer-frontend/tree/stage-1-frontend-and-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={github}
              className="footer__github-image"
              alt="github"
            ></img>
          </a>
          <a
            href="https://www.linkedin.com/in/joel-alvarez-software-engineer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedin}
              className="footer__linkedin-image"
              alt="linkedIn"
            ></img>
          </a>
        </div>
      </div>
    </footer>
  );
}
