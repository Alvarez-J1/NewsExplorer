import "./ModalWithForm.css";
import { useEffect, useId, useRef } from "react";

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

    const firstFormControl = contentRef.current.querySelector(
      "input:not([disabled]), textarea:not([disabled]), select:not([disabled])"
    );
    const fallbackControl = contentRef.current.querySelector(
      "button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])"
    );

    (firstFormControl ?? fallbackControl)?.focus();
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
