import { useEffect, useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch }) {
  const [q, setQ] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(() =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(max-width: 345px)").matches
  );

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 345px)");
    const updatePlaceholder = () => setIsVerySmallScreen(mediaQuery.matches);

    updatePlaceholder();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePlaceholder);
      return () => mediaQuery.removeEventListener("change", updatePlaceholder);
    }

    mediaQuery.addListener(updatePlaceholder);
    return () => mediaQuery.removeListener(updatePlaceholder);
  }, []);

  const runSearch = () => {
    const query = q.trim();

    if (!query) {
      setSearchError("Please enter a keyword");
      return;
    }

    setSearchError("");
    onSearch(query);
  };

  const submit = (e) => {
    e.preventDefault();
    runSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      runSearch();
    }
  };

  return (
    <>
      <form className="search-form" role="search" onSubmit={submit}>
        <input
          className="search-form__input"
          type="text"
          placeholder={
            isVerySmallScreen
              ? "Search news..."
              : "Search news, topics, or sources"
          }
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search query"
        />
        <button
          className="search-form__submit-btn"
          type="submit"
          aria-label="Search"
        >
          <span className="search-form__submit-text">Search</span>
          <svg
            className="search-form__submit-icon"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>

      {searchError && <span className="search__error">{searchError}</span>}

      {/* <button className="search-form__show-more-btn" type="button">
        Show more
      </button> */}
    </>
  );
}
