// Server-side session helpers for getServerSideProps. Import only on the
// server: they read server-only env vars and the httpOnly session cookie.
//
// The browser calls the backend directly at /api/* (same domain; the web
// server, or next.config rewrites locally, send /api/* to the backend). The
// backend sets the httpOnly `sc_session` cookie at login; server-rendered
// pages read it here and call the backend with it as a Bearer token.

export const SESSION_COOKIE = "sc_session";

// Where the Express backend runs, as seen from this server (e.g.
// http://localhost:5001 on the live server). Server-only (no NEXT_PUBLIC_).
export function backendUrl(path) {
  const base = (process.env.BACKEND_URL || "http://localhost:5000").replace(/\/+$/, "");
  return `${base}${path}`;
}

function cookieAttributes(maxAge) {
  const parts = [`Path=/`, `HttpOnly`, `SameSite=Lax`, `Max-Age=${maxAge}`];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

// Clears a session cookie the backend rejected (expired or invalid).
export function clearedSessionCookie() {
  return `${SESSION_COOKIE}=; ${cookieAttributes(0)}`;
}

export function getSessionToken(req) {
  return (req.cookies && req.cookies[SESSION_COOKIE]) || null;
}

// Returns the signed-in user, or null if there's no valid session.
export async function fetchCurrentUser(token) {
  if (!token) return null;
  try {
    const res = await fetch(backendUrl("/api/auth/me"), {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user || null;
  } catch {
    return null;
  }
}
