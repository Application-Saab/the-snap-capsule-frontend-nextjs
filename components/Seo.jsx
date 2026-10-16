import Head from "next/head";
import { SITE, absoluteUrl } from "../lib/site";

// Escape "<" so JSON-LD can never close the surrounding <script> tag.
const toJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

/**
 * Page-level SEO: title, description, canonical, robots, Open Graph,
 * Twitter card and optional JSON-LD. Rendered on the server, so crawlers
 * and link previews get everything in the first HTML response.
 * `robots` comes from getServerSideProps (see robotsMeta in lib/site.js)
 * because the indexing decision depends on server-only env vars.
 */
export default function Seo({
  robots = "index, follow",
  title = SITE.title,
  description = SITE.description,
  path = "/",
  image = SITE.ogImage,
  imageAlt = SITE.name,
  type = "website",
  jsonLd = [],
}) {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content="#97538c" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: toJsonLd(block) }}
        />
      ))}
    </Head>
  );
}
