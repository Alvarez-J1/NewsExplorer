import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch }) {
  const [q, setQ] = useState("");
  const [searchError, setSearchError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) {
      setSearchError("Please enter a keyword");
      return;
    }

    setSearchError("");
    const query = q.trim();
    if (!query) return; // optional: ignore empty submissions
    onSearch(query);
  };

  return (
    <>
      <form className="search-form " role="search" onSubmit={submit}>
        <input
          className="search-form__input"
          type="text"
          placeholder="Text not entered"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search query"
        />
        <button className="search-form__submit-btn" type="submit">
          Search
        </button>
      </form>

      {searchError && <span className="search__error">{searchError}</span>}

      {/* <button className="search-form__show-more-btn" type="button">
        Show more
      </button> */}
    </>
  );
}
