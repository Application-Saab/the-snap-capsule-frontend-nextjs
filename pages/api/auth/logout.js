import { clearedSessionCookie, isSameOrigin } from "../../../lib/auth";

// POST /api/auth/logout — clears the session cookie.
export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (!isSameOrigin(req)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  res.setHeader("Set-Cookie", clearedSessionCookie());
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ ok: true });
}
