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
import AboutCapsule from "../components/landing/AboutCapsule";
import Faq from "../components/landing/Faq";
import { fetchCurrentUser, getSessionToken } from "../lib/auth";
import { robotsMeta } from "../lib/site";
import { landingPageLd } from "../lib/structuredData";


// Server-side rendered on every request, including the signed-in user: the
// server reads the session cookie and gets the user from the backend
// (GET /api/auth/me), so the page knows from the first HTML whether someone
// is signed in and their customerId. Visitors without a session cookie skip
// the backend call.
//
// The response depends on the visitor's cookie, so it isn't shared through
// the CDN (a cached copy could show one visitor's sign-in state to another).
export async function getServerSideProps({ req, res }) {
  const token = getSessionToken(req);
  const user = token ? await fetchCurrentUser(token) : null;
  res.setHeader("Cache-Control", "private, no-cache");
  res.setHeader("Vary", "Cookie");
  return {
    props: {
      jsonLd: landingPageLd(),
      robots: robotsMeta(),
      // Only what the page needs (customerId for Create Capsule).
      user: user ? { id: user.id, name: user.name || null, email: user.email || null } : null,
    },
  };
}

// Landing page built from the Figma landing page design,
// frame 10750:5359. Section order matches the design top to bottom.
export default function Home({ jsonLd, robots, user }) {
  const router = useRouter();
  // Signed-in user from getServerSideProps; updated after signing in in the popup.
  const [currentUser, setCurrentUser] = useState(user);
  // Create Capsule popup: { open, step: "login" | "details", customerId }
  const [capsuleModal, setCapsuleModal] = useState({ open: false, step: "login", customerId: null });
  const [notice, setNotice] = useState("");

  // "Create Capsule" / "Create Now": signed in (known from the server) → the
  // event details; otherwise sign in first. No browser request needed.
  const openCreateCapsule = useCallback(
    (event) => {
      if (event) event.preventDefault();
      setCapsuleModal(
        currentUser
          ? { open: true, step: "details", customerId: currentUser.id }
          : { open: true, step: "login", customerId: null },
      );
    },
    [currentUser],
  );

  const closeCapsuleModal = useCallback(() => setCapsuleModal((m) => ({ ...m, open: false })), []);
  // Back to "login" means the session ended (e.g. expired while the popup was open).
  const changeCapsuleStep = useCallback((step) => {
    if (step === "login") setCurrentUser(null);
    setCapsuleModal((m) => ({ ...m, open: true, step }));
  }, []);
  // Logged in inside the popup: remember who, then show the event details.
  const handleSignedIn = useCallback((signedInUser) => {
    if (signedInUser) setCurrentUser(signedInUser);
    setCapsuleModal({ open: true, step: "details", customerId: signedInUser ? signedInUser.id : null });
  }, []);
  // After creating, open the capsule's weblink gallery page on this site.
  const handleCapsuleCreated = useCallback(
    (capsule) => {
      setCapsuleModal((m) => ({ ...m, open: false }));
      router.push(galleryPath(capsule.id));
    },
    [router],
  );

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
        <AboutCapsule />
        <Faq />
      </main>
      <CreateCapsuleModal
        open={capsuleModal.open}
        step={capsuleModal.step}
        customerId={capsuleModal.customerId}
        onSignedIn={handleSignedIn}
        onClose={closeCapsuleModal}
        onStepChange={changeCapsuleStep}
        onCreated={handleCapsuleCreated}
      />
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

// Same page as the backend's webLink (/weblink-gallery?galleryId=…), kept on
// this site so it also works on localhost and preview deployments.
function galleryPath(galleryId) {
  return `/weblink-gallery?galleryId=${encodeURIComponent(galleryId)}`;
}
