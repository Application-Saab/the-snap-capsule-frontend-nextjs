import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultLanguage, initTranslation, setLanguage as switchLanguage } from "./translate";

// The language/region picked in the dropdown, shared with the whole app so
// prices and dates can follow it. Pages render with the default (English
// (India), ₹) on the server; the saved choice is applied after loading.
const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [language, setLanguageState] = useState(defaultLanguage);

  useEffect(() => {
    setLanguageState(initTranslation());
  }, []);

  const setLanguage = useCallback((id) => {
    const next = switchLanguage(id);
    if (next) setLanguageState(next);
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** { language, setLanguage, formatDate, formatPrice } for the current choice. */
export function useLocale() {
  const ctx = useContext(LocaleContext);
  const language = ctx ? ctx.language : defaultLanguage();
  const setLanguage = ctx ? ctx.setLanguage : () => {};
  return {
    language,
    setLanguage,
    formatDate: (isoDate) => formatDate(isoDate, language.locale),
    formatPrice: (prices) => formatPrice(prices, language),
  };
}

/** "2026-12-05" → "5 December 2026" / "December 5, 2026" / "5. Dezember 2026" … (UTC, so the day never shifts). */
export function formatDate(isoDate, locale) {
  if (!isoDate) return "";
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    date,
  );
}

/**
 * Price for the current currency from `prices` ({ INR: 199, USD: 2.49, … }).
 * Falls back to INR if a currency is missing. INR keeps the "₹199/-" style.
 */
export function formatPrice(prices, language) {
  const currency = prices[language.currency] !== undefined ? language.currency : "INR";
  const amount = prices[currency];
  const locale = currency === language.currency ? language.locale : "en-IN";
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
  return currency === "INR" ? `${formatted}/-` : formatted;
}
