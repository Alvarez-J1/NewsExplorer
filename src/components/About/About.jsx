import "./About.css";

const features = [
  {
    label: "Focused search",
    title: "Find relevant coverage faster",
    text: "Scan trusted coverage with concise summaries and context designed for fast reading.",
  },
  {
    label: "Reading library",
    title: "Save what matters",
    text: "Keep useful articles organized by topic so important reporting is easy to revisit.",
  },
  {
    label: "Built for Every Screen",
    title: "Read comfortably anywhere",
    text: "NewsExplorer adapts from desktop research sessions to quick mobile checks without losing clarity.",
  },
];

export default function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about__container">
        <div className="about__intro">
          <p className="about__eyebrow">Designed for modern news reading</p>
          <h2 className="about__title" id="about-title">
            A cleaner way to follow the stories that matter.
          </h2>
          <p className="about__paragraph">
          NewsExplorer combines search, context, and saved stories into a cleaner reading experience built for people who want the signal without the noise.
          </p>
        </div>

        <section className="about__panel" aria-labelledby="about-features-title">
          <div className="about__brief">
            <span className="about__brief-tag">Today&apos;s brief</span>
            <h3 className="about__brief-title" id="about-features-title">
              Curated stories, cleaner context.
            </h3>
            <p className="about__brief-text">
            Browse readable editorial cards with trusted sources, concise summaries, and quick save actions built for fast scanning.
            </p>
          </div>

          <div className="about__features">
            {features.map((feature) => (
              <article className="about__feature" key={feature.label}>
                <p className="about__feature-label">{feature.label}</p>
                <h3 className="about__feature-title">{feature.title}</h3>
                <p className="about__feature-text">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
