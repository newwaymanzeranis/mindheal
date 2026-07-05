import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import { useAuth } from "~/context/AuthContext";
import { useLang } from "~/context/LanguageContext";
import { buildAuthRedirectUrl, normalizeRedirect } from "~/utils/navigation";
import { buildPageMeta } from "~/utils/seo";
import authCss from "~/styles/auth.css?url";

export const links = () => [{ rel: "stylesheet", href: authCss }];

const HERO_STAT_ICONS = ["bi-shield-check", "bi-truck", "bi-bag-check"];

export function meta() {
  return buildPageMeta({
    title: "Login",
    description: "Sign in to your Mind Heal account to checkout Bach Flower remedies with Cash on Delivery.",
    path: "/login",
    noindex: true,
  });
}

export default function LoginPage() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const { t } = useLang();
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
      setError(err.message || t("auth.login.failed"));
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
              <p className="mt-3 mb-0">{t("auth.continuing")}</p>
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

          <h1 className="au-hero-title">{t("auth.login.heroTitle")}</h1>

          <p className="au-hero-lead">{t("auth.login.heroLead")}</p>

          <div className="au-hero-stats">
            {(Array.isArray(t("auth.login.heroStats"))
              ? t("auth.login.heroStats")
              : []
            ).map((label, index) => (
              <span className="au-stat" key={label}>
                <i className={`bi ${HERO_STAT_ICONS[index] ?? "bi-bag-check"}`} />
                {label}
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
                <h2>{t("auth.login.cardTitle")}</h2>
                <p>{t("auth.login.cardSubtitle")}</p>
              </div>

              {error && (
                <div className="au-error" role="alert">
                  <i className="bi bi-exclamation-circle" />
                  <span>{error}</span>
                </div>
              )}

              <form className="au-form" onSubmit={handleSubmit}>
                <div className="au-field">
                  <label htmlFor="email">{t("auth.login.emailLabel")}</label>
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
                      placeholder={t("auth.login.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div className="au-field">
                  <div className="au-field-row">
                    <label htmlFor="password">{t("auth.login.passwordLabel")}</label>
                    <Link to="/forgot-password" className="au-link">
                      {t("auth.login.forgotPassword")}
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
                      placeholder={t("auth.login.passwordPlaceholder")}
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
                      {t("auth.login.submitting")}
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right" />
                      {t("auth.login.submit")}
                    </>
                  )}
                </button>
              </form>

              <div className="au-trust">
                <span>
                  <i className="bi bi-truck" />
                  {t("auth.trustCod")}
                </span>
                <span>
                  <i className="bi bi-shield-check" />
                  {t("auth.trustSecure")}
                </span>
                <span>
                  <i className="bi bi-heart" />
                  {t("auth.trustGentle")}
                </span>
              </div>

              <p className="au-footer">
                {t("auth.login.newHere")}{" "}
                <Link to={buildAuthRedirectUrl("/register", redirect)}>
                  {t("auth.login.createAccount")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
