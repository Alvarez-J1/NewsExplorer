import "./ModalWithForm.css";
import { useEffect } from "react";

export default function ModalWithForm({
  children,
  title,
  onClose,
  isOpen,
  onSubmit,
  className = "",
  contentClassName = "",
  titleClassName = "",
}) {
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

  return (
    <div
      className={`modal ${isOpen && "modal_opened"} ${className} `}
      onClick={handleOverlayClick}
    >
      <div className={`modal__content ${contentClassName}`}>
        <h2 className={`modal__title ${titleClassName}`}>{title}</h2>

        <form onSubmit={onSubmit} className="modal__form" noValidate>
          {children}
        </form>
      </div>
    </div>
  );
}
