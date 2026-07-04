import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import { useAuth } from "~/context/AuthContext";
import { useLang } from "~/context/LanguageContext";
import { buildAuthRedirectUrl, normalizeRedirect } from "~/utils/navigation";
import authCss from "~/styles/auth.css?url";

export const links = () => [{ rel: "stylesheet", href: authCss }];

const HERO_STAT_ICONS = ["bi-person-plus", "bi-truck", "bi-bag-check"];

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
  const { t } = useLang();
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
      setError(t("auth.register.errPasswordMismatch"));
      return;
    }

    if (password.length < 6) {
      setError(t("auth.register.errPasswordLength"));
      return;
    }

    const digits = phone.replace(/\D/g, "");
    const mobile =
      digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError(t("auth.register.errInvalidMobile"));
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
      setError(err.message || t("auth.register.failed"));
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
              <p className="mt-3 mb-0">{t("auth.takingToCheckout")}</p>
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

          <h1 className="au-hero-title">{t("auth.register.heroTitle")}</h1>

          <p className="au-hero-lead">{t("auth.register.heroLead")}</p>

          <div className="au-hero-stats">
            {(Array.isArray(t("auth.register.heroStats"))
              ? t("auth.register.heroStats")
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
          <div className="au-wrap au-wrap--wide">
            <div className="au-card">
              <div className="au-card-head">
                <div className="au-card-icon">
                  <i className="bi bi-person-plus" />
                </div>
                <h2>{t("auth.register.cardTitle")}</h2>
                <p>{t("auth.register.cardSubtitle")}</p>
              </div>

              {error && (
                <div className="au-error" role="alert">
                  <i className="bi bi-exclamation-circle" />
                  <span>{error}</span>
                </div>
              )}

              <form className="au-form" onSubmit={handleSubmit}>
                <div className="au-field">
                  <label htmlFor="name">{t("auth.register.nameLabel")}</label>
                  <div className="au-input-wrap">
                    <i className="bi bi-person" />
                    <input
                      id="name"
                      type="text"
                      className="au-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      placeholder={t("auth.register.namePlaceholder")}
                    />
                  </div>
                </div>

                <div className="au-field">
                  <label htmlFor="email">{t("auth.register.emailLabel")}</label>
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
                      placeholder={t("auth.register.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div className="au-field">
                  <label htmlFor="phone">{t("auth.register.phoneLabel")}</label>
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
                      placeholder={t("auth.register.phonePlaceholder")}
                      maxLength={14}
                    />
                  </div>
                </div>

                <div className="au-field">
                  <label htmlFor="password">{t("auth.register.passwordLabel")}</label>
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
                      placeholder={t("auth.register.passwordPlaceholder")}
                    />
                  </div>
                  <p className="au-hint">{t("auth.register.passwordHint")}</p>
                </div>

                <div className="au-field">
                  <label htmlFor="confirmPassword">{t("auth.register.confirmLabel")}</label>
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
                      placeholder={t("auth.register.confirmPlaceholder")}
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
                      {t("auth.register.submitting")}
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-check" />
                      {t("auth.register.submit")}
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
                {t("auth.register.haveAccount")}{" "}
                <Link to={buildAuthRedirectUrl("/login", redirect)}>
                  {t("auth.register.login")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
