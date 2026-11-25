// Visitor tracking for the team's dashboard.
//
// Every browser gets a random visitor ID, kept for a year in the `sc_vid`
// cookie (the backend reads and writes the same cookie). It's sent:
//   - on every page view, to POST /api/track/visit (signed in or not; when
//     signed in, the backend adds the account's email from the session),
//   - with login, so the backend links the visitor to the account,
//   - with Create Capsule, so the capsule shows who created it.
// The dashboard then shows email, visitor ID, event name and date together.
//
// It only holds a random ID, nothing personal. Tracking never gets in the
// way: if a call fails, nothing happens.

const COOKIE = "sc_vid";
const ONE_YEAR = 60 * 60 * 24 * 365;
const VALID_ID = /^[A-Za-z0-9_-]{8,64}$/;
const TRACK_API = "/api/track/visit";
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"];

const isBrowser = () => typeof window !== "undefined";

function readCookie() {
  const match = document.cookie.match(/(?:^|;\s*)sc_vid=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function writeCookie(id) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${id}; path=/; max-age=${ONE_YEAR}; SameSite=Lax${secure}`;
}

function randomId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
  // Older browsers: build a UUID v4 from random bytes.
  const bytes = window.crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** This browser's visitor ID, created (and saved in the cookie) on first use. "" on the server. */
export function getVisitorId() {
  if (!isBrowser()) return "";
  try {
    const existing = readCookie();
    if (VALID_ID.test(existing)) return existing;
    const id = randomId();
    writeCookie(id);
    return id;
  } catch {
    return "";
  }
}

/** `body` plus the visitor ID, for login and Create Capsule requests. */
export function withVisitorId(body) {
  const visitorId = getVisitorId();
  return visitorId ? { ...body, visitorId } : body;
}

// UTM tags from the address bar (e.g. ?utm_source=instagram), first visit only.
function utmFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(`utm_${key}`);
    if (value) utm[key] = value.slice(0, 200);
  }
  return Object.keys(utm).length ? utm : undefined;
}

let firstView = true;

/**
 * Records a page view. `path` is the page's path (no query string is sent,
 * so gallery IDs in URLs stay private). The referrer and UTM tags are only
 * sent with the first page view of a visit.
 */
export function trackPageView(path, locale) {
  if (!isBrowser()) return;
  const visitorId = getVisitorId();
  const body = { visitorId, path: String(path || "/").split(/[?#]/)[0], locale };
  if (firstView) {
    firstView = false;
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) body.referrer = document.referrer;
    const utm = utmFromUrl();
    if (utm) body.utm = utm;
  }
  try {
    fetch(TRACK_API, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Tracking must never break the page.
  }
}
