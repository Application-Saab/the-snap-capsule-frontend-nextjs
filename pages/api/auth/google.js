import { forwardAuthPost } from "../../../lib/auth";

// POST /api/auth/google  { credential } → signs in with a Google ID token.
export default function handler(req, res) {
  const credential = req.body && req.body.credential;
  if (req.method === "POST" && (typeof credential !== "string" || !credential)) {
    return res.status(400).json({ message: "Missing Google credential." });
  }
  return forwardAuthPost(req, res, "/api/auth/google", { credential });
}
