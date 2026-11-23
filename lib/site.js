// Site-wide SEO settings used by canonical URLs, Open Graph tags,
// structured data, sitemap.xml and robots.txt.
//
// The live domain is the default. NEXT_PUBLIC_SITE_URL can override it
// (no trailing slash), e.g. for a staging domain.

export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://thesnapcapsule.com").replace(/\/+$/, ""),
  name: "Snap Capsule",
  brand: "Snap Capsule",
  title: "Snap Capsule — One private space for every event memory",
  description:
    "Create one beautiful, private event capsule where guests view and share all your celebration photos. QR code sharing, AI face recognition and auto-sorted albums.",
  locale: "en_IN",
  ogImage: "/og-image.png", // 1200×630
  // Square logo (512×512, white background) for search engines; the
  // Organization JSON-LD includes it. The header uses /logo.webp.
  logo: "/logo-square.png",
  // TODO(content): add official social profile URLs (Instagram, LinkedIn, …)
  // so search engines can connect them to the organization.
  sameAs: [],
};

export const absoluteUrl = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

// Server-side only. Production is indexable; Vercel preview/development
// deployments, and any environment with SEO_NOINDEX=1, are not, so preview
// URLs never show up in search results.
export function isIndexable() {
  if (process.env.SEO_NOINDEX === "1") return false;
  const vercelEnv = process.env.VERCEL_ENV;
  return !vercelEnv || vercelEnv === "production";
}

export const robotsMeta = () => (isIndexable() ? "index, follow, max-image-preview:large" : "noindex, nofollow");
