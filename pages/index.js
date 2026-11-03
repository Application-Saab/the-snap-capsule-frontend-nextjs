import { useCallback, useState } from "react";
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
import capsulecreate from "../assets/capsulecreate.webp"
// import Faq from "../components/landing/Faq";
import { robotsMeta } from "../lib/site";
import { landingPageLd } from "../lib/structuredData";
import CreateCapsuleModal from "../components/Createcapsulemodal";

export async function getServerSideProps({ res }) {
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return { props: { jsonLd: landingPageLd(), robots: robotsMeta() } };
}

export default function Home({ jsonLd, robots }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleCreateCapsule = ({ eventName, eventDate }) => {
    console.log({ eventName, eventDate }); // yahan API call ya router.push() karo
    closeModal();
  };

  return (
    <>
      <Seo path="/" robots={robots} jsonLd={jsonLd} imageAlt="Snap Capsule app showing a shared family event gallery" />
      <Header />
      <main className="overflow-x-hidden bg-white mb-10">
        <Hero  onCreate={openModal}/>
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
      </main>
      
      <CreateCapsuleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCreateCapsule}
        illustrationSrc={capsulecreate}
      />
    </>
  );
}