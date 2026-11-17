import { forwardAuthPost } from "../../../../lib/auth";

// POST /api/auth/email/verify-otp  { email, code } → signs in.
export default function handler(req, res) {
  const { email, code } = req.body || {};
  return forwardAuthPost(req, res, "/api/auth/email/verify-otp", { email, code });
}
