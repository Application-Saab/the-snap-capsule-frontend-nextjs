import { forwardWithSession } from "../../../lib/auth";

// GET  /api/capsules                     → the signed-in user's capsules
// POST /api/capsules { name, eventDate } → create a capsule
export default function handler(req, res) {
  if (req.method === "GET") {
    return forwardWithSession(req, res, { backendPath: "/api/capsules" });
  }
  if (req.method === "POST") {
    const { name, eventDate } = req.body || {};
    return forwardWithSession(req, res, {
      backendPath: "/api/capsules",
      body: { name, eventDate },
    });
  }
  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ message: "Method not allowed" });
}
