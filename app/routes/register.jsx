import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import { useAuth } from "~/context/AuthContext";
import { buildAuthRedirectUrl, normalizeRedirect } from "~/utils/navigation";
import authCss from "~/styles/auth.css?url";

export const links = () => [{ rel: "stylesheet", href: authCss }];

const HERO_STATS = [
  { icon: "bi-person-plus", label: "Quick Signup" },
  { icon: "bi-truck", label: "Cash on Delivery" },
  { icon: "bi-bag-check", label: "Order in Minutes" },
];

export function meta() {
  return [
    { title: "Create Account | Mind Heal" },
    {
      name: "description",
      content:
        "Create your Mind Heal account to order Bach Flower mixtures with Cash on Delivery.",
    },
  ];
}

export default function RegisterPage() {
  const { register, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = normalizeRedirect(searchParams.get("redirect"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect, { replace: true });
    }
  }, [authLoading, isAuthenticated, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const digits = phone.replace(/\D/g, "");
    const mobile =
      digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      await register({
        email,
        password,
        confirmPassword,
        name: name || undefined,
        phone,
      });
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (!authLoading && isAuthenticated) {
    return (
      <main className="main au-page">
        <section className="au-main" style={{ marginTop: 0, borderRadius: 0 }}>
          <div className="container">
            <div className="au-loading">
              <div className="spinner-border" role="status" />
              <p className="mt-3 mb-0">Taking you to checkout…</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

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

          <h1 className="au-hero-title">Create Account</h1>

          <p className="au-hero-lead">
            Register to order Mind Heal mixtures with Cash on Delivery — quick
            signup, gentle healing delivered to your door.
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
                  <i className="bi bi-person-plus" />
                </div>
                <h2>Create your account</h2>
                <p>Quick signup — pay when your order is delivered</p>
              </div>

              {error && (
                <div className="au-error" role="alert">
                  <i className="bi bi-exclamation-circle" />
                  <span>{error}</span>
                </div>
              )}

              <form className="au-form" onSubmit={handleSubmit}>
                <div className="au-field">
                  <label htmlFor="name">Full name</label>
                  <div className="au-input-wrap">
                    <i className="bi bi-person" />
                    <input
                      id="name"
                      type="text"
                      className="au-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="au-field">
                  <label htmlFor="email">Email *</label>
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

                <div className="au-field">
                  <label htmlFor="phone">Mobile number *</label>
                  <div className="au-input-wrap">
                    <i className="bi bi-phone" />
                    <input
                      id="phone"
                      type="tel"
                      className="au-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="10-digit mobile"
                      maxLength={14}
                    />
                  </div>
                </div>

                <div className="au-field">
                  <label htmlFor="password">Password *</label>
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
                      placeholder="Create a password"
                    />
                  </div>
                  <p className="au-hint">At least 6 characters</p>
                </div>

                <div className="au-field">
                  <label htmlFor="confirmPassword">Confirm password *</label>
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
                      placeholder="Confirm your password"
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
                      Creating account…
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-check" />
                      Register &amp; Continue
                    </>
                  )}
                </button>
              </form>

              <div className="au-trust">
                <span>
                  <i className="bi bi-truck" />
                  Cash on Delivery
                </span>
                <span>
                  <i className="bi bi-shield-check" />
                  Secure account
                </span>
                <span>
                  <i className="bi bi-heart" />
                  Gentle healing
                </span>
              </div>

              <p className="au-footer">
                Already have an account?{" "}
                <Link to={buildAuthRedirectUrl("/login", redirect)}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
