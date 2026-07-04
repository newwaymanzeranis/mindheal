import { useLang } from "~/context/LanguageContext";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`lang-switch ${className}`.trim()}
      role="group"
      aria-label="Select language"
    >
      <button
        type="button"
        className={`lang-switch__btn${lang === "en" ? " is-active" : ""}`}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <span className="lang-switch__sep" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        className={`lang-switch__btn${lang === "hi" ? " is-active" : ""}`}
        onClick={() => setLang("hi")}
        aria-pressed={lang === "hi"}
      >
        हिं
      </button>
    </div>
  );
}
