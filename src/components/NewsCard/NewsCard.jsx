import React from "react";
import "./NewsCard.css";

export default function NewsCard({
  item,
  onCardClick,
  isLoggedIn,
  onRequireLogin,
  saved = false,
  onSave,
  onUnsave,
  isSavedPage = false,
  className = "",
}) {
  const [isSaved, setIsSaved] = React.useState(saved);

  React.useEffect(() => {
    setIsSaved(saved);
  }, [saved]);

  const handleCardClick = () => {
    //If we have a url from the API, open it in a new tab
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      //Fallback: if a parent passed a handler, still support it
      onCardClick?.(item);
    }
  };

  const handleSaveToggle = () => {
    if (!isLoggedIn) {
      onRequireLogin?.();
      return;
    }

    if (isSaved) {
      onUnsave?.(item);
      setIsSaved(false);
    } else {
      onSave?.(item);
      setIsSaved(true);
    }
  };

  const handleCardKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  const articleTitle = item.title || "Untitled article";
  const saveButtonLabel = !isLoggedIn
    ? `Sign in to save ${articleTitle}`
    : isSaved
    ? `Remove ${articleTitle} from saved articles`
    : `Save ${articleTitle}`;

  return (
    <li className={`card ${className}`.trim()}>
      <div className="card__media">
        {item.image ? (
          <img
            onClick={handleCardClick}
            className="card__image"
            src={item.image}
            alt={item.title || "Article image"}
          />
        ) : (
          <div
            className="card__image card__image--placeholder"
            onClick={handleCardClick}
            aria-label="Article image unavailable"
          />
        )}
        {isSavedPage && item.keyword && (
          <span className="card__chip">{item.keyword}</span>
        )}

        <div className="card__action">
          {isSavedPage ? (
            // Trash button (saved page)
            <>
              <button
                type="button"
                className="card__trash-btn"
                title="Remove from saved"
                onClick={() => onUnsave?.(item)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6H21" />

                  <path d="M8 6V4C8 3.7 8.1 3.48 8.29 3.29C8.48 3.1 8.73 3 9 3H15C15.27 3 15.52 3.1 15.71 3.29C15.9 3.48 16 3.73 16 4V6" />

                  <path d="M19 6V20C19 20.53 18.79 21.04 18.41 21.41C18.04 21.79 17.53 22 17 22H7C6.47 22 5.96 21.79 5.59 21.41C5.21 21.04 5 20.53 5 20V6H19Z" />

                  <path d="M10 11V17" />
                  <path d="M14 11V17" />
                </svg>
              </button>
              <div className="card__tooltip-remove" role="tooltip">
                Remove from saved
              </div>
            </>
          ) : (
            // Bookmark button (Results page)//
            <>
              <div className="card__save">
                <button
                  type="button"
                  className="card__save-btn"
                  aria-label={saveButtonLabel}
                  aria-pressed={isSaved}
                  onClick={handleSaveToggle}
                  title={isSaved ? "Saved" : "Save"}
                >
                  <svg
                    className="card__save-icon card__save-icon--outline"
                    width="14"
                    height="19"
                    viewBox="0 0 14 19"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 1.5h10v16l-5-3-5 3z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    className="card__save-icon card__save-icon--filled"
                    width="14"
                    height="19"
                    viewBox="0 0 14 19"
                    aria-hidden="true"
                  >
                    <path d="M2 1.5h10v16l-5-3-5 3z" fill="currentColor" />
                  </svg>
                </button>
                {!isLoggedIn && (
                  <div className="card__tooltip" role="tooltip">
                    Sign in to save articles
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className="card__body"
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        role="link"
        tabIndex={0}
        aria-label={`Open article: ${articleTitle}`}
      >
        <p className="card__date">{item.date}</p>
        <h2 className="card__title">{item.title}</h2>
        <p className="card__text">{item.text}</p>
        <p className="card__source">{item.source}</p>
      </div>
    </li>
  );
}
