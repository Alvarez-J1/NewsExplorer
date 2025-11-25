import "./Footer.css";
import linkedin from "../../assets/LinkedIn.svg";
import github from "../../assets/github.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__supersite">© 2025 Supersite, Powered by News API</p>

      <div className="footer__top-row">
        <div className="footer__text">
          <p className="footer__home">Home</p>
          <p className="footer__tripleten">TripleTen</p>
        </div>
        <div className="footer__icons">
          <img src={github} className="github__image" alt="github"></img>
          <img src={linkedin} className="linkedin__image" alt="linkedIn"></img>
        </div>
      </div>
    </footer>
  );
}
