import { absoluteUrl } from "../lib/site";

// Add new public pages here as the site grows.
// Set `lastmod` (YYYY-MM-DD) to the date the page content last really changed.
// Update it only when you edit the page. Do not use today's date automatically.
const PAGES = [{ path: "/", lastmod: "2026-10-16" }];

// Escape characters that are not allowed raw inside XML text.
function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemap() {
  // For dynamic pages (blog posts, products), fetch them here and append:
  //   const posts = await getAllPosts();
  //   const dynamic = posts.map((p) => ({
  //     path: `/blog/${p.slug}`,
  //     lastmod: p.updatedAt.slice(0, 10),
  //   }));
  //   const all = [...PAGES, ...dynamic];
  // (make buildSitemap async and await it in getServerSideProps)
  const all = PAGES;

  const urls = all
    .map((p) => {
      const lastmod = p.lastmod ? `\n    <lastmod>${escapeXml(p.lastmod)}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeXml(absoluteUrl(p.path))}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// Rendered on the server at /sitemap.xml.
export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildSitemap());
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
