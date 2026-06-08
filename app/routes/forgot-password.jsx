import { useState } from "react";
import { Link, useNavigate } from "react-router";

import PageTitle from "~/components/PageTitle";
import { authApi } from "~/lib/api";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

const STEPS = { EMAIL: 1, OTP: 2, PASSWORD: 3, DONE: 4 };

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
    <main className="main">
      <PageTitle
        title="Forgot Password"
        description="Reset your Mind Heal account password via email OTP"
        current="Forgot Password"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="auth-card">
                <h2 className="h4 mb-1">Reset password</h2>
                <p className="text-muted small mb-4">
                  {step === STEPS.EMAIL && "Enter your registered email to receive an OTP"}
                  {step === STEPS.OTP && "Enter the 6-digit OTP sent to your email"}
                  {step === STEPS.PASSWORD && "Set your new password"}
                  {step === STEPS.DONE && "Your password has been updated"}
                </p>

                {error && (
                  <div className="alert alert-danger">
                    <div>{error}</div>
                    {error.includes("App Password") && (
                      <div className="mt-3 small">
                        <strong>Gmail App Password kaise banayein:</strong>
                        <ol className="mb-0 ps-3 mt-2">
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
                          <li>16-character password copy karke server/.env mein SMTP_PASS update karein</li>
                          <li>Server restart karein: cd server && npm run dev</li>
                        </ol>
                      </div>
                    )}
                  </div>
                )}
                {info && step !== STEPS.DONE && (
                  <div className="alert alert-success">{info}</div>
                )}

                {step === STEPS.EMAIL && (
                  <form onSubmit={handleSendOtp}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success w-100"
                      disabled={loading}
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </form>
                )}

                {step === STEPS.OTP && (
                  <form onSubmit={handleVerifyOtp}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="otp">
                        OTP
                      </label>
                      <input
                        id="otp"
                        type="text"
                        className="form-control text-center"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        required
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="6-digit OTP"
                        autoComplete="one-time-code"
                        style={{ letterSpacing: "4px", fontSize: "1.25rem" }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success w-100 mb-2"
                      disabled={loading || otp.length !== 6}
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-link w-100 small"
                      disabled={loading}
                      onClick={() => {
                        setStep(STEPS.EMAIL);
                        setOtp("");
                        setError("");
                      }}
                    >
                      Resend OTP — change email
                    </button>
                  </form>
                )}

                {step === STEPS.PASSWORD && (
                  <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">
                        New password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        autoComplete="new-password"
                      />
                      <div className="form-text">At least 6 characters</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="confirmPassword">
                        Confirm new password
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        autoComplete="new-password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success w-100"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Change Password"}
                    </button>
                  </form>
                )}

                {step === STEPS.DONE && (
                  <div className="text-center">
                    <div className="alert alert-success mb-4">
                      {info || "Password changed successfully!"}
                    </div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => navigate("/login")}
                    >
                      Go to Login
                    </button>
                  </div>
                )}

                {step !== STEPS.DONE && (
                  <p className="text-center small text-muted mt-4 mb-0">
                    Remember your password?{" "}
                    <Link to="/login">Back to login</Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
