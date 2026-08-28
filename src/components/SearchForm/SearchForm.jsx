import { useEffect, useId, useState } from "react";
import "./SearchForm.css";

const VERY_SMALL_SCREEN_QUERY = "(max-width: 345px)";
const DEFAULT_SEARCH_PLACEHOLDER = "Search news, topics, or sources";
const COMPACT_SEARCH_PLACEHOLDER = "Search news...";

export default function SearchForm({ onSearch }) {
  const [q, setQ] = useState("");
  const [searchError, setSearchError] = useState("");
  const searchErrorId = useId();
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(() =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(VERY_SMALL_SCREEN_QUERY).matches
  );

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return undefined;
    }

    const mediaQuery = window.matchMedia(VERY_SMALL_SCREEN_QUERY);
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
          name="q"
          placeholder={
            isVerySmallScreen
              ? COMPACT_SEARCH_PLACEHOLDER
              : DEFAULT_SEARCH_PLACEHOLDER
          }
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search query"
          aria-invalid={Boolean(searchError)}
          aria-describedby={searchError ? searchErrorId : undefined}
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
            focusable="false"
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

      {searchError && (
        <span id={searchErrorId} className="search__error" role="alert">
          {searchError}
        </span>
      )}

    </>
  );
}
