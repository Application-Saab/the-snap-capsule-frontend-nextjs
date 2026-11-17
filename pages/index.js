import { useCallback, useEffect, useState } from "react";
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

// Landing page built from the Figma landing page design,
// frame 10750:5359. Section order matches the design top to bottom.
export default function Home({ jsonLd, robots }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [notice, setNotice] = useState("");

  // "Create Capsule" / "Create Now": sign in first. The page is cached for
  // everyone, so the session is checked here in the browser, not on the server.
  const openCreateCapsule = useCallback(async (event) => {
    if (event) event.preventDefault();
    let user = null;
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) user = (await res.json()).user;
    } catch {
      // Network problem: show the login popup.
    }
    if (user) setNotice(signedInText(user));
    else setLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => setLoginOpen(false), []);
  const handleSignedIn = useCallback((user) => {
    setLoginOpen(false);
    setNotice(signedInText(user));
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <>
      <Seo path="/" robots={robots} jsonLd={jsonLd} imageAlt="Snap Capsule app showing a shared family event gallery" />
      <Header />
      <main className="overflow-x-hidden bg-white mb-10">
        <Hero onCreateCapsule={openCreateCapsule} />
        <SmartFeatures/>
        <ShareQr />
        <Comparison />
        <Plans />
        <GuestJoin />
        <TryDemo />
        <HowItWorks/>
        <CreateCapsuleCta onCreateCapsule={openCreateCapsule} />
        <Occasions />
        <Testimonials />
        {/* <Faq /> */}
      </main>
      <LoginModal open={loginOpen} onClose={closeLogin} onSignedIn={handleSignedIn} />
      <p
        role="status"
        aria-live="polite"
        className={`fixed inset-x-0 bottom-6 z-40 mx-auto w-fit max-w-[90%] rounded-full bg-brand-ink px-5 py-2.5 text-center font-inter text-[14px] font-medium text-white shadow-lg transition-opacity ${
          notice ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {notice}
      </p>
    </>
  );
}

function signedInText(user) {
  const who = (user && (user.name || user.email)) || "";
  return who ? `You're signed in as ${who}` : "You're signed in";
}
