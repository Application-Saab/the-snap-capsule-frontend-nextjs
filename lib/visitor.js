// Visitor tracking for the admin panel.
//
// Every browser gets a random visitor ID, kept for a year in the `sc_vid`
// cookie (the backend reads and writes the same cookie). It's sent:
//   - once when the site opens, to POST /api/track/visit (if the visitor is
//     logged in, the backend saves their email with it),
//   - with login, so the backend links the visitor ID to the email,
//   - with Create Capsule, so the capsule is saved with the visitor ID.
// The admin panel then lists visitor ID, email and capsules together.
//
// It only holds a random ID, nothing personal. If a call fails, nothing happens.

const COOKIE = "sc_vid";
const ONE_YEAR = 60 * 60 * 24 * 365;
const VALID_ID = /^[A-Za-z0-9_-]{8,64}$/;
const TRACK_API = "/api/track/visit";

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

let registered = false;

/** Saves this browser's visitor ID on the backend (once per page load). */
export function registerVisitor() {
  if (!isBrowser() || registered) return;
  registered = true;
  const visitorId = getVisitorId();
  if (!visitorId) return;
  try {
    fetch(TRACK_API, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Tracking must never break the page.
  }
}
