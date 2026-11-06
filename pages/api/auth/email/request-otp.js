import { forwardAuthPost } from "../../../../lib/auth";

// POST /api/auth/email/request-otp  { email } → emails a 6-digit code.
export default function handler(req, res) {
  const email = req.body && req.body.email;
  return forwardAuthPost(req, res, "/api/auth/email/request-otp", { email });
}
