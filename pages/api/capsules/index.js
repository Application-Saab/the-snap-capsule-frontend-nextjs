import { backendUrl, clearedSessionCookie, fetchCurrentUser, getSessionToken, isSameOrigin } from "../../../lib/auth";

// Backend API that creates the Event Capsule folder (follows Hora).
const CREATE_PATH = "/api/internal/create-event-capsule";

/**
 * POST /api/capsules { name, eventDate: "YYYY-MM-DD" }
 *
 * Creates the Event Capsule for the signed-in user:
 *   POST {BACKEND_URL}/api/internal/create-event-capsule
 *   { eventName: name, eventDate, customerId: <signed-in user's id> }
 * The customerId always comes from the session cookie, never from the browser.
 *
 * Replies 201 { capsule: { id, name, eventDate, shortCode, webLink } } or { message, field? }.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (!isSameOrigin(req)) return res.status(403).json({ message: "Forbidden" });
  res.setHeader("Cache-Control", "private, no-store");

  const token = getSessionToken(req);
  const user = await fetchCurrentUser(token);
  if (!user) {
    if (token) res.setHeader("Set-Cookie", clearedSessionCookie());
    return res.status(401).json({ message: "Please sign in to continue.", code: "UNAUTHENTICATED" });
  }

  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const eventDate = typeof req.body?.eventDate === "string" ? req.body.eventDate : "";
  if (name.length < 2 || name.length > 80) {
    return res.status(400).json({ message: "Please enter an event name (2–80 characters).", field: "name" });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
    return res.status(400).json({ message: "Please choose a valid event date.", field: "eventDate" });
  }

  let backendRes;
  try {
    backendRes = await fetch(backendUrl(CREATE_PATH), {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ eventName: name, eventDate, customerId: user.id }),
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    return res.status(502).json({ message: "We couldn't reach the server. Please try again." });
  }

  // The backend replies like Hora: { error, status, message, data }.
  const data = await backendRes.json().catch(() => ({}));
  if (backendRes.ok && !data.error && data.data) {
    const capsule = data.data;
    return res.status(backendRes.status).json({
      capsule: {
        id: capsule.folderId,
        name: capsule.eventName || name,
        eventDate: capsule.eventDate || eventDate,
        shortCode: capsule.shortCode || null,
        webLink: capsule.webLink || null,
      },
    });
  }
  if (backendRes.status === 401) {
    res.setHeader("Set-Cookie", clearedSessionCookie());
    return res.status(401).json({ message: "Please sign in to continue.", code: "UNAUTHENTICATED" });
  }
  if (backendRes.status === 400) {
    const field = /date/i.test(data.message || "") ? "eventDate" : "name";
    return res.status(400).json({ message: data.message || "Please check the details.", field });
  }
  console.error(`[create-capsule] backend ${backendRes.status}: ${data.message || "no message"}`);
  return res.status(502).json({ message: "Couldn't create your capsule. Please try again." });
}
