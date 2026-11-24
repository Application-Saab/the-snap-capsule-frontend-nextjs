import type { NextConfig } from "next";

// The browser calls the backend directly at /api/* on this same domain, like
// Hora (horaservices.com/api/* → backend). On the live server the web server
// already sends /api/* to the backend; this rewrite does the same when the
// request reaches Next.js (local development, or a host without that rule).
// BACKEND_URL: http://localhost:5000 locally, http://localhost:5001 on the server.
const backend = (process.env.BACKEND_URL || "http://localhost:5000").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backend}/api/:path*` }];
  },
};

export default nextConfig;
