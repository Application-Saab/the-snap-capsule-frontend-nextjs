import { absoluteUrl, isIndexable } from "../lib/site";

// Rendered on the server at /robots.txt. Production allows crawling and
// points to the sitemap; preview deployments block everything (see
// isIndexable in lib/site.js).
export async function getServerSideProps({ res }) {
  const body = isIndexable()
    ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`
    : "User-agent: *\nDisallow: /\n";
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(body);
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}
