import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Seo from "../components/Seo";
import CreateCapsuleModal from "../components/capsule/CreateCapsuleModal";
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
  const router = useRouter();
  const [capsuleModal, setCapsuleModal] = useState({ open: false, startStep: "login" });
  const closeCapsuleModal = useCallback(() => setCapsuleModal((m) => ({ ...m, open: false })), []);

  // "Create Capsule": signed-in users go straight to the event details step,
  // everyone else signs in first. (The page is cached for everyone, so the
  // session is checked here in the browser rather than on the server.)
  const openCreateCapsule = useCallback(async (event) => {
    if (event) event.preventDefault();
    let signedIn = false;
    try {
      signedIn = (await fetch("/api/auth/me")).ok;
    } catch {
      // Network problem: start with sign-in.
    }
    setCapsuleModal({ open: true, startStep: signedIn ? "details" : "login" });
  }, []);

  // /?create=1 (e.g. "+ Create capsule" on the account page) opens it.
  useEffect(() => {
    if (!router.isReady || router.query.create !== "1") return;
    router.replace("/", undefined, { shallow: true, scroll: false });
    openCreateCapsule();
  }, [router, openCreateCapsule]);

  const handleCapsuleCreated = useCallback(
    (capsule) => {
      setCapsuleModal((m) => ({ ...m, open: false }));
      router.push(`/account?created=${encodeURIComponent(capsule.id)}`);
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
      <CreateCapsuleModal
        open={capsuleModal.open}
        startStep={capsuleModal.startStep}
        onClose={closeCapsuleModal}
        onCreated={handleCapsuleCreated}
      />
    </>
  );
}
