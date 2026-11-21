// Whole-page translation with Google's website translator.
//
// Nothing is hard-coded per language: Google translates whatever text is on
// the page (including popups opened later), so new content is translated
// automatically. The choice is kept in Google's own `googtrans` cookie
// ("/en/<code>"), which the translator reads on every page load.
//
// The script is only loaded once someone picks a language other than English
// (or already has that cookie), so English visitors never download it.
// To keep a word untranslated, add className="notranslate" (or translate="no").

export const DEFAULT_LANGUAGE = "en";

// English plus 5 international languages. `code` is Google Translate's code.
export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "zh-CN", label: "中文 (简体)" },
];

const SCRIPT_ID = "google-translate-script";
const SCRIPT_SRC = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
const ELEMENT_ID = "google_translate_element";
const COOKIE = "googtrans";

const isBrowser = () => typeof window !== "undefined";
const isSupported = (code) => LANGUAGES.some((l) => l.code === code);

/** The language chosen in this browser ("en" if none). */
export function getCurrentLanguage() {
  if (!isBrowser()) return DEFAULT_LANGUAGE;
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  const code = match ? decodeURIComponent(match[1]).split("/").pop() : "";
  return code && isSupported(code) ? code : DEFAULT_LANGUAGE;
}

// The cookie is set for this host and, on a real domain, for ".domain" too,
// because Google's script may read either.
function cookieDomains() {
  const host = window.location.hostname;
  const domains = [""];
  if (host.includes(".") && !/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    domains.push(`; domain=${host}`, `; domain=.${host.replace(/^www\./, "")}`);
  }
  return domains;
}

function writeCookie(code) {
  const oneYear = 60 * 60 * 24 * 365;
  for (const domain of cookieDomains()) {
    document.cookie = `${COOKIE}=/${DEFAULT_LANGUAGE}/${code}; path=/; max-age=${oneYear}; SameSite=Lax${domain}`;
  }
}

function clearCookie() {
  for (const domain of cookieDomains()) {
    document.cookie = `${COOKIE}=; path=/; max-age=0${domain}`;
  }
}

/** Sets <html lang/dir> so screen readers and right-to-left languages behave. */
function applyDocumentLanguage(code) {
  const lang = LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
  document.documentElement.lang = code === DEFAULT_LANGUAGE ? "en-IN" : code;
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
        pageLanguage: DEFAULT_LANGUAGE,
        includedLanguages: LANGUAGES.filter((l) => l.code !== DEFAULT_LANGUAGE)
          .map((l) => l.code)
          .join(","),
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

/** Call once on page load: re-applies a language chosen earlier. */
export function initTranslation() {
  if (!isBrowser()) return;
  const code = getCurrentLanguage();
  applyDocumentLanguage(code);
  if (code !== DEFAULT_LANGUAGE) {
    patchDomForTranslation();
    loadTranslator();
  }
}

/** Switches the whole site to `code`. English reloads the original page. */
export function setLanguage(code) {
  if (!isBrowser() || !isSupported(code)) return;
  if (code === DEFAULT_LANGUAGE) {
    clearCookie();
    window.location.reload();
    return;
  }
  writeCookie(code);
  applyDocumentLanguage(code);
  patchDomForTranslation();
  if (document.getElementById(SCRIPT_ID)) selectInGoogleWidget(code);
  else loadTranslator(); // reads the cookie and translates once loaded
}
