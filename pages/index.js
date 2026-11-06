import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Seo from "../components/Seo";
import LoginModal from "../components/auth/LoginModal";
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

// Where "Create Capsule" leads once the user is signed in.
// TODO: point this at the create-capsule page when it exists.
const CREATE_CAPSULE_PATH = "/account";

// Landing page built from the Figma landing page design,
// frame 10750:5359. Section order matches the design top to bottom.
export default function Home({ jsonLd, robots }) {
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  // Signed in → go straight on. Otherwise show the login popup.
  // (The page itself is cached for everyone, so the session is checked here
  // in the browser rather than on the server.)
  const openCreateCapsule = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          router.push(CREATE_CAPSULE_PATH);
          return;
        }
      } catch {
        // Network problem: fall through and show the login popup.
      }
      setLoginOpen(true);
    },
    [router]
  );

  return (
    <>
      <Seo path="/" robots={robots} jsonLd={jsonLd} imageAlt="Snap Capsule app showing a shared family event gallery" />
      <Header />
      <main className="overflow-x-hidden bg-white">
        <Hero onCreateCapsule={openCreateCapsule} />
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
      <LoginModal open={loginOpen} onClose={closeLogin} next={CREATE_CAPSULE_PATH} />
    </>
  );
}
