import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { authApi } from "~/lib/api";
import { buildPageMeta } from "~/utils/seo";
import authCss from "~/styles/auth.css?url";

export const links = () => [{ rel: "stylesheet", href: authCss }];

const STEPS = { EMAIL: 1, OTP: 2, PASSWORD: 3, DONE: 4 };

const HERO_STATS = [
  { icon: "bi-envelope-check", label: "Email OTP" },
  { icon: "bi-shield-lock", label: "Secure Reset" },
  { icon: "bi-clock", label: "Quick Process" },
];

const STEP_HINTS = {
  [STEPS.EMAIL]: "Enter your registered email to receive an OTP",
  [STEPS.OTP]: "Enter the 6-digit OTP sent to your email",
  [STEPS.PASSWORD]: "Set your new password",
  [STEPS.DONE]: "Your password has been updated",
};

export function meta() {
  return buildPageMeta({
    title: "Forgot Password",
    description: "Reset your Mind Heal account password securely via email OTP.",
    path: "/forgot-password",
    noindex: true,
  });
}

function StepIndicator({ step }) {
  const items = [STEPS.EMAIL, STEPS.OTP, STEPS.PASSWORD];

  return (
    <div className="au-steps" aria-hidden>
      {items.map((item) => (
        <span
          key={item}
          className={`au-step ${
            step > item ? "au-step--done" : step === item ? "au-step--active" : ""
          }`}
        />
      ))}
    </div>
  );
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const data = await authApi.forgotPassword(email);
      setInfo(data.message || "OTP sent to your email.");
      setStep(STEPS.OTP);
    } catch (err) {
      setError(err.message || "Could not send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const data = await authApi.verifyOtp(email, otp);
      setResetToken(data.resetToken);
      setInfo(data.message || "OTP verified.");
      setStep(STEPS.PASSWORD);
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const data = await authApi.resetPassword({
        email,
        resetToken,
        password,
        confirmPassword,
      });
      setInfo(data.message || "Password changed successfully.");
      setStep(STEPS.DONE);
    } catch (err) {
      setError(err.message || "Could not reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main au-page">
      <section className="au-hero">
        <div className="au-hero-glow" aria-hidden />
        <div className="au-hero-glow au-hero-glow--left" aria-hidden />
        <div className="container">
          <div className="au-hero-logo" aria-hidden>
            <img
              src="/assets/img/mind-heal-logo-vertical-white.png"
              alt=""
            />
          </div>

          <h1 className="au-hero-title">Forgot Password</h1>

          <p className="au-hero-lead">
            Reset your Mind Heal account password securely — we&apos;ll send a
            one-time code to your registered email.
          </p>

          <div className="au-hero-stats">
            {HERO_STATS.map((stat) => (
              <span className="au-stat" key={stat.label}>
                <i className={`bi ${stat.icon}`} />
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="au-main">
        <div className="container">
          <div className="au-wrap au-wrap--wide">
            <div className="au-card">
              <div className="au-card-head">
                <div className="au-card-icon">
                  <i className="bi bi-key" />
                </div>
                <h2>Reset password</h2>
                <p>{STEP_HINTS[step]}</p>
              </div>

              {step !== STEPS.DONE && <StepIndicator step={step} />}

              {error && (
                <div className="au-error" role="alert">
                  <i className="bi bi-exclamation-circle" />
                  <div>
                    <span>{error}</span>
                    {error.includes("App Password") && (
                      <div className="au-error-detail">
                        <strong>Gmail App Password kaise banayein:</strong>
                        <ol>
                          <li>
                            <a
                              href="https://myaccount.google.com/security"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Google Account Security
                            </a>{" "}
                            par login karein
                          </li>
                          <li>2-Step Verification ON karein</li>
                          <li>
                            <a
                              href="https://myaccount.google.com/apppasswords"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              App passwords
                            </a>{" "}
                            → Mail → &quot;Mind Heal&quot;
                          </li>
                          <li>
                            16-character password copy karke server/.env mein
                            SMTP_PASS update karein
                          </li>
                          <li>Server restart karein: cd server && npm run dev</li>
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {info && step !== STEPS.DONE && (
                <div className="au-info" role="status">
                  <i className="bi bi-check-circle" />
                  <span>{info}</span>
                </div>
              )}

              {step === STEPS.EMAIL && (
                <form className="au-form" onSubmit={handleSendOtp}>
                  <div className="au-field">
                    <label htmlFor="email">Email</label>
                    <div className="au-input-wrap">
                      <i className="bi bi-envelope" />
                      <input
                        id="email"
                        type="email"
                        className="au-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <button type="submit" className="au-submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden
                        />
                        Sending OTP…
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send" />
                        Send OTP
                      </>
                    )}
                  </button>
                </form>
              )}

              {step === STEPS.OTP && (
                <form className="au-form" onSubmit={handleVerifyOtp}>
                  <div className="au-field">
                    <label htmlFor="otp">OTP</label>
                    <div className="au-input-wrap">
                      <i className="bi bi-shield-check" />
                      <input
                        id="otp"
                        type="text"
                        className="au-input au-otp-input"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        required
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="000000"
                        autoComplete="one-time-code"
                      />
                    </div>
                    <p className="au-hint">6-digit code sent to {email}</p>
                  </div>
                  <button
                    type="submit"
                    className="au-submit"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden
                        />
                        Verifying…
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check2-circle" />
                        Verify OTP
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="au-btn-text"
                    disabled={loading}
                    onClick={() => {
                      setStep(STEPS.EMAIL);
                      setOtp("");
                      setError("");
                      setInfo("");
                    }}
                  >
                    <i className="bi bi-arrow-left" />
                    Resend OTP — change email
                  </button>
                </form>
              )}

              {step === STEPS.PASSWORD && (
                <form className="au-form" onSubmit={handleResetPassword}>
                  <div className="au-field">
                    <label htmlFor="password">New password</label>
                    <div className="au-input-wrap">
                      <i className="bi bi-lock" />
                      <input
                        id="password"
                        type="password"
                        className="au-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        autoComplete="new-password"
                        placeholder="New password"
                      />
                    </div>
                    <p className="au-hint">At least 6 characters</p>
                  </div>
                  <div className="au-field">
                    <label htmlFor="confirmPassword">Confirm new password</label>
                    <div className="au-input-wrap">
                      <i className="bi bi-shield-lock" />
                      <input
                        id="confirmPassword"
                        type="password"
                        className="au-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        autoComplete="new-password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <button type="submit" className="au-submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden
                        />
                        Updating…
                      </>
                    ) : (
                      <>
                        <i className="bi bi-key" />
                        Change Password
                      </>
                    )}
                  </button>
                </form>
              )}

              {step === STEPS.DONE && (
                <div className="au-done">
                  <div className="au-done-icon">
                    <i className="bi bi-check-lg" />
                  </div>
                  <p>{info || "Password changed successfully!"}</p>
                  <button
                    type="button"
                    className="au-submit"
                    onClick={() => navigate("/login")}
                  >
                    <i className="bi bi-box-arrow-in-right" />
                    Go to Login
                  </button>
                </div>
              )}

              {step !== STEPS.DONE && (
                <p className="au-footer">
                  Remember your password?{" "}
                  <Link to="/login">Back to login</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
