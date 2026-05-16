// import SearchForm from "../SearchForm/SearchForm";
import park from "../../assets/park.png";
import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img src={park} className="about__image" alt="Your Name"></img>
        <div className="about__content">
          <h1 className="about__title">About the author</h1>
          <p className="about__paragraph">
            My name is Joel Alvarez. I&apos;m a front-end software engineer with
            a strong focus on building clean, responsive, and user-focused web
            applications. I&apos;m passionate about writing clean code,
            improving UI/UX, and continuously learning new development tools and
            technologies.
          </p>
        </div>
      </div>
    </section>
  );
}
