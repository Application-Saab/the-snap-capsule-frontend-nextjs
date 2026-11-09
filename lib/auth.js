// Server-side session helpers. Import only from getServerSideProps or API
// routes: they read server-only env vars and the httpOnly session cookie.

export const SESSION_COOKIE = "sc_session";

// Where the Express backend runs. Server-only (no NEXT_PUBLIC_), so the
// browser never needs to know it.
export function backendUrl(path) {
  const base = (process.env.BACKEND_URL || "http://localhost:5000").replace(/\/+$/, "");
  return `${base}${path}`;
}

// Seconds until the JWT expires, read from its `exp` claim (not verified
// here; the backend verifies the token on every request).
function secondsUntilExpiry(token) {
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
    const seconds = Math.floor(payload.exp - Date.now() / 1000);
    return seconds > 0 ? seconds : 0;
  } catch {
    return 60 * 60 * 24 * 7;
  }
}

function cookieAttributes(maxAge) {
  const parts = [`Path=/`, `HttpOnly`, `SameSite=Lax`, `Max-Age=${maxAge}`];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function sessionCookie(token) {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; ${cookieAttributes(secondsUntilExpiry(token))}`;
}

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

// Blocks cross-site POSTs to our auth API routes (login CSRF). Browsers
// always send Origin on cross-origin POSTs.
export function isSameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

/**
 * Shared handler for sign-in API routes: forwards a JSON POST to the backend.
 * If the backend returns a session token, stores it in the httpOnly cookie
 * and strips it from the response, so browser JavaScript never sees it.
 * Error responses (message, code, retryAfter, attemptsLeft) pass through.
 */
export async function forwardAuthPost(req, res, backendPath, body) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (!isSameOrigin(req)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  let backendRes;
  try {
    backendRes = await fetch(backendUrl(backendPath), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return res.status(502).json({ message: "We couldn't reach the server. Please try again." });
  }

  const data = await backendRes.json().catch(() => ({}));
  res.setHeader("Cache-Control", "no-store");

  if (!backendRes.ok) {
    const status = backendRes.status >= 400 && backendRes.status < 600 ? backendRes.status : 502;
    const retryAfter = backendRes.headers.get("retry-after");
    if (retryAfter) res.setHeader("Retry-After", retryAfter);
    const { success, ...rest } = data;
    return res.status(status).json({ ...rest, message: data.message || "Something went wrong. Please try again." });
  }

  const { token, success, ...rest } = data;
  if (token) res.setHeader("Set-Cookie", sessionCookie(token));
  return res.status(200).json(rest);
}

/**
 * For API routes that act as the signed-in user: forwards the request to the
 * backend with the session cookie turned into `Authorization: Bearer`.
 * No session → 401. Backend says the session is invalid → also clears the
 * cookie. Responses pass through (minus the backend's `success` flag).
 */
export async function forwardWithSession(req, res, { backendPath, body }) {
  const method = req.method;
  if (method !== "GET" && !isSameOrigin(req)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  res.setHeader("Cache-Control", "private, no-store");

  const token = getSessionToken(req);
  if (!token) {
    return res.status(401).json({ message: "Please sign in to continue.", code: "UNAUTHENTICATED" });
  }

  let backendRes;
  try {
    backendRes = await fetch(backendUrl(backendPath), {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return res.status(502).json({ message: "We couldn't reach the server. Please try again." });
  }

  const data = await backendRes.json().catch(() => ({}));
  if (backendRes.status === 401) res.setHeader("Set-Cookie", clearedSessionCookie());
  const { success, ...rest } = data;
  if (!backendRes.ok && !rest.message) rest.message = "Something went wrong. Please try again.";
  return res.status(backendRes.status).json(rest);
}

// Server-side: the signed-in user's capsules (empty list on any problem).
export async function fetchMyCapsules(token) {
  if (!token) return [];
  try {
    const res = await fetch(backendUrl("/api/capsules"), {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.capsules) ? data.capsules : [];
  } catch {
    return [];
  }
}

// Server-side: one of the user's capsules.
// Returns { capsule } on success, or { status } (401, 404, 502…) otherwise.
export async function fetchMyCapsule(token, id) {
  if (!token) return { status: 401 };
  try {
    const res = await fetch(backendUrl(`/api/capsules/${encodeURIComponent(id)}`), {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { status: res.status };
    const data = await res.json();
    return data.capsule ? { capsule: data.capsule } : { status: 502 };
  } catch {
    return { status: 502 };
  }
}

// Only allow redirects back into this site (prevents open redirects).
export function safeNextPath(value, fallback = "/capsules") {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
