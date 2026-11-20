import { forwardWithSession } from "../../../lib/auth";

// POST /api/capsules { name, eventDate: "YYYY-MM-DD" } → create an event capsule
// for the signed-in user. Forwarded to the backend's POST /api/capsules, which
// should reply 201 { capsule: { id, name, eventDate, ... } }.
export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { name, eventDate } = req.body || {};
  return forwardWithSession(req, res, {
    backendPath: "/api/capsules",
    body: { name, eventDate },
    missingMessage: "Creating capsules isn't available yet. Please try again soon.",
  });
}
