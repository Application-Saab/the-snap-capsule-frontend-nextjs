import { backendUrl, clearedSessionCookie, fetchCurrentUser, getSessionToken, isSameOrigin } from "../../../lib/auth";

// Snap Capsule backend's create-event API (same as Hora's).
const CREATE_EVENT_PATH = "/api/customer/event/create-event-invite";

/**
 * POST /api/capsules { name, eventDate: "YYYY-MM-DD" }
 *
 * Creates the event for the signed-in user on the Snap Capsule backend:
 *   { userId: <signed-in user's id>, hostName: name, eventDate }
 * The userId always comes from the session cookie, never from the browser.
 *
 * Replies 201 { capsule: { id, name, eventDate, shortCode } } or { message, field? }.
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
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || Number.isNaN(Date.parse(`${eventDate}T00:00:00Z`))) {
    return res.status(400).json({ message: "Please choose a valid event date.", field: "eventDate" });
  }

  let backendRes;
  try {
    backendRes = await fetch(backendUrl(CREATE_EVENT_PATH), {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId: user.id, hostName: name, eventDate }),
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    return res.status(502).json({ message: "We couldn't reach the server. Please try again." });
  }

  // The backend replies like Hora: { error, status, message, data }.
  const data = await backendRes.json().catch(() => ({}));
  if (backendRes.ok && !data.error && data.data) {
    const event = data.data;
    return res.status(201).json({
      capsule: { id: event._id, name: event.hostName || name, eventDate, shortCode: event.shortCode || null },
    });
  }
  if (backendRes.status === 401) {
    res.setHeader("Set-Cookie", clearedSessionCookie());
    return res.status(401).json({ message: "Please sign in to continue.", code: "UNAUTHENTICATED" });
  }
  if (backendRes.status === 404) {
    return res.status(404).json({ message: "We couldn't find your account. Please sign in again.", code: "USER_NOT_FOUND" });
  }
  console.error(`[create-event] backend ${backendRes.status}: ${data.message || "no message"}`);
  return res
    .status(backendRes.status >= 400 && backendRes.status < 500 ? backendRes.status : 502)
    .json({ message: "Couldn't create your capsule. Please try again." });
}
