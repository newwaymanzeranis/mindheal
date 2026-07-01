import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import { useAuth } from "~/context/AuthContext";
import { buildAuthRedirectUrl, normalizeRedirect } from "~/utils/navigation";
import authCss from "~/styles/auth.css?url";

export const links = () => [{ rel: "stylesheet", href: authCss }];

const HERO_STATS = [
  { icon: "bi-shield-check", label: "Secure Login" },
  { icon: "bi-truck", label: "Cash on Delivery" },
  { icon: "bi-bag-check", label: "Quick Checkout" },
];

export function meta() {
  return [
    { title: "Login | Mind Heal" },
    {
      name: "description",
      content: "Sign in to your Mind Heal account to checkout with Cash on Delivery.",
    },
  ];
}

export default function LoginPage() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = normalizeRedirect(searchParams.get("redirect"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setLoading(true);

    try {
      await login(email, password);
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
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
              <p className="mt-3 mb-0">Continuing…</p>
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

          <h1 className="au-hero-title">Login</h1>

          <p className="au-hero-lead">
            Sign in to place your Cash on Delivery order and continue your
            healing journey with Mind Heal.
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
          <div className="au-wrap">
            <div className="au-card">
              <div className="au-card-head">
                <div className="au-card-icon">
                  <i className="bi bi-person-circle" />
                </div>
                <h2>Welcome back</h2>
                <p>Login to checkout with Cash on Delivery</p>
              </div>

              {error && (
                <div className="au-error" role="alert">
                  <i className="bi bi-exclamation-circle" />
                  <span>{error}</span>
                </div>
              )}

              <form className="au-form" onSubmit={handleSubmit}>
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

                <div className="au-field">
                  <div className="au-field-row">
                    <label htmlFor="password">Password</label>
                    <Link to="/forgot-password" className="au-link">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="au-input-wrap">
                    <i className="bi bi-lock" />
                    <input
                      id="password"
                      type="password"
                      className="au-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
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
                      Signing in…
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right" />
                      Login &amp; Continue
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
                New here?{" "}
                <Link to={buildAuthRedirectUrl("/register", redirect)}>
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
