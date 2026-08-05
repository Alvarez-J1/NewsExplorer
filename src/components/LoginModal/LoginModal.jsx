import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";

const DEMO_WAKEUP_INFO_MS = 6000;
const LOGIN_EMAIL_ERROR_ID = "login-email-error";

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
  const [showDemoWakeupInfo, setShowDemoWakeupInfo] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValues(() => ({ email: "", password: "" }));
      setLoginError("");
      setWrongField("");
      setIsDemoSubmitting(false);
      setShowDemoWakeupInfo(false);
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
    } catch {
      setWrongField("password");
      setLoginError("Email or password incorrect");
    }
  };

  const handleDemoLogin = async () => {
    const wakeupInfoId = window.setTimeout(
      () => setShowDemoWakeupInfo(true),
      DEMO_WAKEUP_INFO_MS,
    );

    setLoginError("");
    setWrongField("");
    setShowDemoWakeupInfo(false);
    setIsDemoSubmitting(true);

    try {
      await onDemoLogin();
      setShowDemoWakeupInfo(false);
    } catch {
      setShowDemoWakeupInfo(true);
    } finally {
      window.clearTimeout(wakeupInfoId);
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
          aria-describedby={
            wrongField === "email" ? LOGIN_EMAIL_ERROR_ID : undefined
          }
        />
      </label>
      {wrongField === "email" && (
        <span id={LOGIN_EMAIL_ERROR_ID} className="modal__error">
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
        {buttonText || "Sign in"}
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
          Skip sign in and explore the app with a demo account.
        </p>
        {showDemoWakeupInfo && (
          <div
            className="loginmodal__demo-info"
            role="status"
            aria-live="polite"
          >
            <span className="loginmodal__demo-info-icon" aria-hidden="true">
              i
            </span>
            <div className="loginmodal__demo-info-copy">
              <p className="loginmodal__demo-info-title">
                The backend is hosted on Render&apos;s free tier.
              </p>
              <p className="loginmodal__demo-info-text">
                The first request may take 30-60 seconds while the server wakes
                up after inactivity. The app will open automatically when it is
                ready.
              </p>
            </div>
          </div>
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
