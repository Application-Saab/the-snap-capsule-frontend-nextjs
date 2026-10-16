import { SITE, absoluteUrl } from "./site";
import { FAQS, FAQ_PLACEHOLDER, PLANS } from "../components/landing/data";

// schema.org JSON-LD for the landing page. Kept to facts shown on the page:
// no ratings or reviews are marked up, since the design's figures are
// placeholders and self-published review markup is ignored by Google.

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE.brand,
    url: absoluteUrl("/"),
    ...(SITE.logo ? { logo: absoluteUrl(SITE.logo) } : {}),
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE.name,
    url: absoluteUrl("/"),
    inLanguage: "en-IN",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function productLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl("/#event-capsule"),
    name: "Event Capsule",
    description:
      "A private online space where hosts and guests upload, organize and share every photo from an event, with QR code sharing and AI face recognition.",
    image: absoluteUrl(SITE.ogImage),
    brand: { "@type": "Brand", name: SITE.brand },
    offers: PLANS.map((p) => ({
      "@type": "Offer",
      name: `${p.name} ${p.variant}`,
      price: p.amount.toFixed(2),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/#plans"),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.amount.toFixed(2),
        priceCurrency: "INR",
        billingDuration: 1,
        billingIncrement: 1,
        unitCode: "ANN",
      },
    })),
  };
}

// Returns null until at least one FAQ has a real answer.
export function faqLd() {
  const answered = FAQS.filter((f) => f.a && f.a !== FAQ_PLACEHOLDER);
  if (!answered.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function landingPageLd() {
  return [organizationLd(), websiteLd(), productLd(), faqLd()].filter(Boolean);
}
