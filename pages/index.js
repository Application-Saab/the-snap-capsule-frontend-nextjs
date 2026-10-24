import Seo from "../components/Seo";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import SmartFeatures from "../components/landing/SmartFeatures";
import ShareQr from "../components/landing/ShareQr";
import Comparison from "../components/landing/Comparison";
import Plans from "../components/landing/Plans";
import GuestJoin from "../components/landing/GuestJoin";
import TryDemo from "../components/landing/TryDemo";
import HowItWorks from "../components/landing/HowItWorks";
import CreateCapsuleCta from "../components/landing/CreateCapsuleCta";
import Occasions from "../components/landing/Occasions";
import Testimonials from "../components/landing/Testimonials";
// import Faq from "../components/landing/Faq";
import { robotsMeta } from "../lib/site";
import { landingPageLd } from "../lib/structuredData";

// Server-side rendered on every request. The content is the same for every
// visitor, so the response is also cached at the CDN edge for 5 minutes and
// served stale for up to a day while it refreshes in the background.
export async function getServerSideProps({ res }) {
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return { props: { jsonLd: landingPageLd(), robots: robotsMeta() } };
}

// Landing page built from the Figma landing page design,
// frame 10750:5359. Section order matches the design top to bottom.
export default function Home({ jsonLd, robots }) {
  return (
    <>
      <Seo path="/" robots={robots} jsonLd={jsonLd} imageAlt="Snap Capsule app showing a shared family event gallery" />
      <Header />
      <main className="overflow-x-hidden bg-white">
        <Hero />
        <SmartFeatures />
        <ShareQr />
        <Comparison />
        <Plans />
        <GuestJoin />
        <TryDemo />
        <HowItWorks />
        <CreateCapsuleCta />
        <Occasions />
        <Testimonials />
        {/* <Faq /> */}
      </main>
    </>
  );
}
