import "./Preloader.css";

export default function Preloader() {
  return (
    <section
      className="results-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="preloader">
        <div className="circle-preloader" aria-hidden="true" />
        <p className="preloader__text">Searching for news...</p>
      </div>
    </section>
  );
}
