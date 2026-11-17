import { fetchCurrentUser, getSessionToken } from "../../../lib/auth";

// GET /api/auth/me → 200 { user } when signed in, 401 otherwise.
// Lets the browser check the session without ever reading the cookie.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }
  res.setHeader("Cache-Control", "private, no-store");
  const user = await fetchCurrentUser(getSessionToken(req));
  if (!user) return res.status(401).json({ user: null });
  return res.status(200).json({ user });
}
