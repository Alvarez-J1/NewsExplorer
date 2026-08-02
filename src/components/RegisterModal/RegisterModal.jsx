import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";

const REGISTER_EMAIL_ERROR_ID = "register-email-error";

export default function RegisterModal({
  onClose,
  isOpen,
  onRegister,
  onOpenLogin,
  buttonText,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    username: "",
  });

  const [signupError, setSignupError] = useState("");
  const [wrongField, setWrongField] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", username: "" });
      setSignupError("");
      setWrongField("");
    }
  }, [isOpen, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(values.email)) {
      setWrongField("email");
      setSignupError("This email is not available");
      return;
    }

    try {
      await onRegister(values);
      setWrongField(null);
      setSignupError("");
    } catch (err) {
      const status =
        err?.code === "INVALID_CREDENTIALS"
          ? 401
          : err?.status ?? err?.response?.status ?? Number(err?.message);

      if (status === 401) {
        setWrongField("password");
        setSignupError("Email or password incorrect");
      } else {
        setWrongField("password");
        setSignupError("Email or password incorrect");
      }
    }
  };

  return (
    <ModalWithForm
      title="Sign up"
      description="Create a reading profile to save stories and organize your coverage."
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      titleClassName="modal__title--sp"
      contentClassName="modal__content--sp"
      submitClassName="modal__submit--signup"
      disabled={!values.email || !values.password || !values.username}
    >
      <label htmlFor="email" className="modal__label registermodal__email">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Enter email"
          required
          minLength="1"
          maxLength="999"
          onChange={handleChange}
          value={values.email}
          aria-invalid={wrongField === "email"}
          aria-describedby={
            wrongField === "email" ? REGISTER_EMAIL_ERROR_ID : undefined
          }
        />
      </label>
      <label
        htmlFor="registerModal__password"
        className="modal__label registermodal__password"
      >
        Password
        <input
          type="password"
          className="modal__input"
          id="registerModal__password"
          name="password"
          placeholder="Enter password"
          required
          minLength="1"
          maxLength="999"
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <label
        htmlFor="registermodal__name"
        className={`modal__label registermodal__username ${
          wrongField === "email" ? "modal__label-error" : ""
        }`}
      >
        Name
        <input
          type="text"
          className="modal__input registermodal__name"
          id="registermodal__name"
          name="username"
          placeholder="Your name"
          required
          minLength="1"
          maxLength="999"
          onChange={handleChange}
          value={values.username}
        />
      </label>
      {wrongField === "email" && (
        <span id={REGISTER_EMAIL_ERROR_ID} className="modal__error">
          {signupError}
        </span>
      )}
      <button
        disabled={!values.email || !values.password || !values.username}
        type="submit"
        className="modal__submit--sp"
      >
        {buttonText || "Sign up"}
      </button>
      <p className="modal__auth-note--sp">
        <span className="modal__auth-or--sp">or </span>
        <button
          type="button"
          onClick={onOpenLogin}
          className="registermodal__switch"
        >
          Sign in
        </button>
      </p>
    </ModalWithForm>
  );
}
