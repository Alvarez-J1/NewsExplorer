import "./SuccessModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function SuccessModal({ isOpen, onClose, onOpenLogin }) {
  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Registration successfully completed!"
      description="Your profile is ready. Sign in to start saving stories."
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="modal__content--success"
      titleClassName="modal__title--success"
      submitClassName="modal__submit--success"
    >
      <button
        onClick={onOpenLogin}
        type="button"
        className="modal__button--success"
      >
        Sign in
      </button>
    </ModalWithForm>
  );
}
