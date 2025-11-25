// import SearchForm from "../SearchForm/SearchForm";
import authorPhoto from "../../assets/me.jpg";
import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img src={authorPhoto} className="about__image" alt="Your Name"></img>
        <div className="about__content">
          <h1 className="about__title">About the author</h1>
          <p className="about__paragraph">
            My name is Joel Alvarez. I'm a front-end developer with a strong
            focus on building clean, responsive, and user-focused web
            applications. I'm currently studying software engineering at
            TripleTen, where I've built multiple full-stack projects using
            React, JavaScript, Node.js, Express, MongoDB, and REST APIs. I'm
            passionate about writing clean code, improving UI/UX, and
            continuously learning new development tools and technologies. The
            News Explorer project demonstrates my ability to work with APIs,
            client-side routing, Vite, and reusable React components.
          </p>
        </div>
      </div>
    </section>
  );
}
