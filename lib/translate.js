// Language / region choice for the whole site.
//
// Each dropdown entry decides three things:
//   - translate: Google Translate language code for the page text (null = English, no translation)
//   - locale:    how dates and numbers are written (Intl), e.g. "de-DE" → "5. Dezember 2026"
//   - currency:  which plan price to show (prices per currency are in components/landing/data.js)
//
// Page text is translated with Google's website translator. Nothing is
// hard-coded per language: Google translates whatever text is on the page
// (including popups opened later), so new content is translated automatically.
//
// The choice is kept in the `sc_lang` cookie (entry id). When the entry needs
// translation, Google's own `googtrans` cookie ("/en/<code>") is set too, which
// its translator reads on every page load. Google's script is only loaded once
// someone picks a translated language, so English visitors never download it.
// To keep a word untranslated, add className="notranslate" (or translate="no").

export const DEFAULT_LANGUAGE = "en-IN";

// Grouped by region in the dropdown. `country` picks the flag (public/flags/<country>.svg).
export const LANGUAGES = [
  // Asia (English (India) is the default)
  { id: "en-IN", label: "English (India)", region: "Asia", country: "IN", translate: null, locale: "en-IN", currency: "INR" },
  { id: "hi", label: "हिन्दी", region: "Asia", country: "IN", translate: "hi", locale: "hi-IN", currency: "INR" },
  { id: "zh-CN", label: "中文 (简体)", region: "Asia", country: "CN", translate: "zh-CN", locale: "zh-CN", currency: "CNY" },
  { id: "ja", label: "日本語", region: "Asia", country: "JP", translate: "ja", locale: "ja-JP", currency: "JPY" },
  { id: "ko", label: "한국어", region: "Asia", country: "KR", translate: "ko", locale: "ko-KR", currency: "KRW" },
  { id: "th", label: "ไทย", region: "Asia", country: "TH", translate: "th", locale: "th-TH-u-ca-gregory", currency: "THB" },
  { id: "id", label: "Bahasa Indonesia", region: "Asia", country: "ID", translate: "id", locale: "id-ID", currency: "IDR" },
  { id: "ms", label: "Bahasa Melayu", region: "Asia", country: "MY", translate: "ms", locale: "ms-MY", currency: "MYR" },
  // USA
  { id: "en-US", label: "English (US)", region: "USA", country: "US", translate: null, locale: "en-US", currency: "USD" },
  { id: "es", label: "Español (EE. UU.)", region: "USA", country: "US", translate: "es", locale: "es-US", currency: "USD" },
  // Europe
  { id: "fr", label: "Français", region: "Europe", country: "FR", translate: "fr", locale: "fr-FR", currency: "EUR" },
  { id: "de", label: "Deutsch", region: "Europe", country: "DE", translate: "de", locale: "de-DE", currency: "EUR" },
  { id: "it", label: "Italiano", region: "Europe", country: "IT", translate: "it", locale: "it-IT", currency: "EUR" },
  { id: "pt", label: "Português", region: "Europe", country: "PT", translate: "pt", locale: "pt-PT", currency: "EUR" },
  // Saudi Arabia (Gregorian calendar, right-to-left)
  { id: "ar", label: "العربية", region: "Saudi Arabia", country: "SA", translate: "ar", locale: "ar-SA-u-ca-gregory", currency: "SAR", dir: "rtl" },
];

/** LANGUAGES grouped by region, in order: [{ region, languages: [...] }]. */
export const LANGUAGE_GROUPS = LANGUAGES.reduce((groups, lang) => {
  const group = groups.find((g) => g.region === lang.region);
  if (group) group.languages.push(lang);
  else groups.push({ region: lang.region, languages: [lang] });
  return groups;
}, []);

export const flagSrc = (lang) => `/flags/${lang.country}.svg`;

const SCRIPT_ID = "google-translate-script";
const SCRIPT_SRC = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
const ELEMENT_ID = "google_translate_element";
const CHOICE_COOKIE = "sc_lang";
const GOOGLE_COOKIE = "googtrans";
const ONE_YEAR = 60 * 60 * 24 * 365;

const isBrowser = () => typeof window !== "undefined";
export const findLanguage = (id) => LANGUAGES.find((l) => l.id === id) || null;
export const defaultLanguage = () => findLanguage(DEFAULT_LANGUAGE);

function readCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

// Set for this host and, on a real domain, for ".domain" too, because Google's
// script may read either.
function cookieDomains() {
  const host = window.location.hostname;
  const domains = [""];
  if (host.includes(".") && !/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    domains.push(`; domain=${host}`, `; domain=.${host.replace(/^www\./, "")}`);
  }
  return domains;
}

// Values are written as-is (they only contain letters, "-" and "/"): Google's
// translator expects exactly "/en/de", not the URL-encoded "%2Fen%2Fde".
function writeCookie(name, value) {
  for (const domain of cookieDomains()) {
    document.cookie = `${name}=${value}; path=/; max-age=${ONE_YEAR}; SameSite=Lax${domain}`;
  }
}

function clearCookie(name) {
  for (const domain of cookieDomains()) {
    document.cookie = `${name}=; path=/; max-age=0${domain}`;
  }
}

/** The entry chosen in this browser (English (India) if none). */
export function getCurrentLanguage() {
  if (!isBrowser()) return defaultLanguage();
  const chosen = findLanguage(readCookie(CHOICE_COOKIE));
  if (chosen) return chosen;
  // Only Google's cookie (e.g. set before sc_lang existed): match by translation code.
  const code = readCookie(GOOGLE_COOKIE).split("/").pop();
  return (code && LANGUAGES.find((l) => l.translate === code)) || defaultLanguage();
}

/** Sets <html lang/dir> so screen readers and right-to-left languages behave. */
function applyDocumentLanguage(lang) {
  document.documentElement.lang = lang.translate || lang.locale.split("-u-")[0];
  document.documentElement.dir = lang.dir || "ltr";
}

// Google's translator wraps text in <font> tags behind React's back, and
// React then crashes when it removes or moves that text ("Failed to execute
// 'removeChild' on 'Node'"). This makes those two DOM calls tolerant.
function patchDomForTranslation() {
  if (!isBrowser() || window.__snapTranslatePatched || typeof Node !== "function") return;
  window.__snapTranslatePatched = true;
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function removeChild(child) {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child);
  };
  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function insertBefore(newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    return originalInsertBefore.call(this, newNode, referenceNode);
  };
}

function loadTranslator() {
  if (document.getElementById(SCRIPT_ID)) return;
  if (!document.getElementById(ELEMENT_ID)) {
    const holder = document.createElement("div");
    holder.id = ELEMENT_ID;
    holder.setAttribute("aria-hidden", "true");
    document.body.appendChild(holder);
  }
  window.googleTranslateElementInit = () => {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: [...new Set(LANGUAGES.map((l) => l.translate).filter(Boolean))].join(","),
        autoDisplay: false,
      },
      ELEMENT_ID,
    );
  };
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

// Google's hidden <select>; changing it translates the page in place.
function selectInGoogleWidget(code, attempts = 40) {
  const combo = document.querySelector("select.goog-te-combo");
  if (combo) {
    combo.value = code;
    combo.dispatchEvent(new Event("change"));
    return;
  }
  if (attempts > 0) setTimeout(() => selectInGoogleWidget(code, attempts - 1), 250);
}

/** Call once on page load: re-applies the choice made earlier. Returns it. */
export function initTranslation() {
  const lang = getCurrentLanguage();
  if (!isBrowser()) return lang;
  applyDocumentLanguage(lang);
  if (lang.translate) {
    patchDomForTranslation();
    loadTranslator();
  }
  return lang;
}

/**
 * Switches the site to entry `id`. Returns the new entry, or null if the page
 * is about to reload (going from a translated language back to English).
 */
export function setLanguage(id) {
  const lang = findLanguage(id);
  if (!isBrowser() || !lang) return null;
  const wasTranslated = Boolean(readCookie(GOOGLE_COOKIE));
  writeCookie(CHOICE_COOKIE, lang.id);

  if (!lang.translate) {
    // English: no translation. Coming from a translated page, reload to get
    // the original text back; between English (India) and (US), just update.
    if (wasTranslated) {
      clearCookie(GOOGLE_COOKIE);
      window.location.reload();
      return null;
    }
    applyDocumentLanguage(lang);
    return lang;
  }

  writeCookie(GOOGLE_COOKIE, `/en/${lang.translate}`);
  applyDocumentLanguage(lang);
  patchDomForTranslation();
  if (document.getElementById(SCRIPT_ID)) selectInGoogleWidget(lang.translate);
  else loadTranslator(); // reads the cookie and translates once loaded
  return lang;
}
