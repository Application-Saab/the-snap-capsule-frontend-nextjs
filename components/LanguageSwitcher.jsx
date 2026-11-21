import { useEffect, useState } from "react";
import { DEFAULT_LANGUAGE, LANGUAGE_GROUPS, getCurrentLanguage, setLanguage } from "../lib/translate";

// Language dropdown, grouped by region (USA, Europe, Saudi Arabia, Asia).
// Picking a language translates the whole page with
// Google's website translator (see lib/translate.js); English is the default.
// The control itself is marked "notranslate" so the language names stay as is.
export default function LanguageSwitcher({ className = "" }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  // The choice lives in a cookie, so read it after mounting.
  useEffect(() => {
    setLanguageState(getCurrentLanguage());
  }, []);

  return (
    <label className={`notranslate relative flex items-center ${className}`} translate="no">
      <span className="sr-only">Language</span>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-2 h-4 w-4 text-brand"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
      </svg>
      <select
        value={language}
        onChange={(e) => {
          setLanguageState(e.target.value);
          setLanguage(e.target.value);
        }}
        className="h-9 max-w-[132px] cursor-pointer appearance-none truncate rounded-full border border-brand/30 bg-white pl-7 pr-7 font-inter sm:max-w-[220px] text-[13px] font-medium text-brand-ink outline-none transition hover:border-brand focus:border-brand focus:ring-2 focus:ring-brand/20"
        aria-label="Choose language"
      >
        {LANGUAGE_GROUPS.map((group) => (
          <optgroup key={group.region} label={group.region}>
            {group.languages.map((l) => (
              <option key={l.code} value={l.code} lang={l.code}>
                {l.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-brand"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}
