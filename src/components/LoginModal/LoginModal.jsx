import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";

export default function LoginModal({
  isOpen,
  onClose,
  onOpenRegister,
  buttonText,
  onLogin,
  onDemoLogin,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [wrongField, setWrongField] = useState("");
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValues(() => ({ email: "", password: "" }));
      setLoginError("");
      setWrongField("");
      setIsDemoSubmitting(false);
    }
  }, [isOpen, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(values.email)) {
      setWrongField("email");
      setLoginError("Invalid email address");
      return;
    }

    try {
      await onLogin(values);
      setWrongField(null);
      setLoginError("");
    } catch (err) {
      const status =
        err?.code === "INVALID_CREDENTIALS"
          ? 401
          : err?.status ?? err?.response?.status ?? Number(err?.message);

      if (status === 401) {
        setWrongField("password");
        setLoginError("Email or password incorrect");
      } else {
        setWrongField("password");
        setLoginError("Email or password incorrect");
      }
    }
  };

  const handleDemoLogin = async () => {
    setLoginError("");
    setWrongField("");
    setIsDemoSubmitting(true);

    try {
      await onDemoLogin();
    } catch {
      setWrongField("demo");
      setLoginError("Demo access is temporarily unavailable. Please try again.");
    } finally {
      setIsDemoSubmitting(false);
    }
  };

  return (
    <ModalWithForm
      title="Sign in"
      description="Continue to your saved stories, topics, and reading history."
      name="login"
      buttonText="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      type="submit"
      contentClassName="modal__content--si"
      titleClassName="modal__title--si"
      submitClassName="modal__submit--si"
    >
      <label
        htmlFor="loginmodal__email"
        className={`modal__label loginmodal__email ${
          wrongField === "email" ? "modal__label-error" : ""
        }`}
      >
        Email
        <input
          type="email"
          className={`modal__input ${
            wrongField === "email" ? "input-error" : ""
          }`}
          id="loginmodal__email"
          name="email"
          placeholder="Enter email"
          required
          minLength="1"
          maxLength="999"
          onChange={handleChange}
          value={values.email}
          aria-invalid={wrongField === "email"}
          aria-describedby={wrongField === "email" ? "email-error" : undefined}
        />
      </label>
      {wrongField === "email" && (
        <span id="email-error" className="modal__error">
          {loginError}
        </span>
      )}
      <label
        htmlFor="loginmodal__password"
        className={`modal__label loginmodal__password ${
          wrongField === "password" ? "modal__label--error" : ""
        }`}
      >
        {wrongField === "password" ? "Incorrect password" : "Password"}
      </label>
      {/* Password input */}
      <input
        type="password"
        className={`modal__input ${
          wrongField === "password" ? "input-error" : ""
        }`}
        id="loginmodal__password"
        name="password"
        placeholder="Enter password"
        required
        minLength="1"
        maxLength="999"
        onChange={handleChange}
        value={values.password}
        aria-invalid={wrongField === "password"}
      />
      <button
        disabled={!values.email || !values.password || isDemoSubmitting}
        type="submit"
        className="modal__submit--si"
      >
        {buttonText}
        Sign in
      </button>
      <div className="loginmodal__demo">
        <button
          type="button"
          className="loginmodal__demo-button"
          onClick={handleDemoLogin}
          disabled={isDemoSubmitting}
        >
          {isDemoSubmitting ? "Opening demo..." : "View Demo"}
        </button>
        <p className="loginmodal__demo-note">
          Skip sign in and explore the app with preloaded demo data.
        </p>
        {wrongField === "demo" && (
          <span className="modal__error loginmodal__demo-error">
            {loginError}
          </span>
        )}
      </div>
      <p className="modal__auth-note">
        <span className="modal__auth-or">or </span>
        <button
          type="button"
          className="loginmodal__switch"
          onClick={onOpenRegister}
        >
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}
