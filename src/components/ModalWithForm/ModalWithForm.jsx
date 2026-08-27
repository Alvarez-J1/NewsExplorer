import "./ModalWithForm.css";
import { useEffect, useId, useRef } from "react";

const FOCUSABLE_MODAL_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export default function ModalWithForm({
  children,
  title,
  description,
  onClose,
  isOpen,
  onSubmit,
  className = "",
  contentClassName = "",
  titleClassName = "",
}) {
  const titleId = useId();
  const descriptionId = useId();
  const contentRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const activeElement = document.activeElement;
    previouslyFocusedElementRef.current =
      activeElement && typeof activeElement.focus === "function"
        ? activeElement
        : null;

    const firstFormControl = contentRef.current.querySelector(
      "input:not([disabled]), textarea:not([disabled]), select:not([disabled])"
    );
    const fallbackControl = contentRef.current.querySelector(
      FOCUSABLE_MODAL_SELECTOR
    );

    const handleTabKey = (e) => {
      if (e.key !== "Tab" || !contentRef.current) return;

      const focusableElements = Array.from(
        contentRef.current.querySelectorAll(FOCUSABLE_MODAL_SELECTOR)
      );

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    (firstFormControl ?? fallbackControl)?.focus();
    document.addEventListener("keydown", handleTabKey);

    return () => {
      const previousElement = previouslyFocusedElementRef.current;

      if (previousElement && document.contains(previousElement)) {
        previousElement.focus();
      }

      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen]);

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""} ${className}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      aria-hidden={!isOpen}
    >
      <div className={`modal__content ${contentClassName}`} ref={contentRef}>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        />

        <div className="modal__header">
          <p className="modal__eyebrow">NewsExplorer</p>
          <h2 id={titleId} className={`modal__title ${titleClassName}`}>
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className="modal__description">
              {description}
            </p>
          )}
        </div>

        <form onSubmit={onSubmit} className="modal__form" noValidate>
          {children}
        </form>
      </div>
    </div>
  );
}
