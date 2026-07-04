import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { DEFAULT_LANG, LANG_COOKIE, normalizeLang, translate } from "~/i18n";
import { pick } from "~/utils/i18nContent";

const LanguageContext = createContext(null);

const ONE_YEAR = 60 * 60 * 24 * 365;

function writeCookie(lang) {
  if (typeof document === "undefined") return;
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
}

export function LanguageProvider({ initialLang = DEFAULT_LANG, children }) {
  const [lang, setLangState] = useState(() => normalizeLang(initialLang));

  const setLang = useCallback((next) => {
    const value = normalizeLang(next);
    setLangState(value);
    writeCookie(value);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", value);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "hi" ? "en" : "hi");
  }, [lang, setLang]);

  const value = useMemo(() => {
    const t = (key, vars) => translate(lang, key, vars);
    const tc = (obj, field) => pick(obj, field, lang);
    return { lang, setLang, toggleLang, t, tc };
  }, [lang, setLang, toggleLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}
