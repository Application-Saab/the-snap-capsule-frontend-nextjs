import Head from "next/head";
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
import Faq from "../components/landing/Faq";

// Server-side rendered on every request. The content is the same for every
// visitor, so the response is also cached at the CDN edge for 5 minutes and
// served stale for up to a day while it refreshes in the background.
export async function getServerSideProps({ res }) {
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return { props: {} };
}

// Landing page built from the Figma design "Hora website design Ui (All)",
// frame 10750:5359. Section order matches the design top to bottom.
export default function Home() {
  return (
    <>
      <Head>
        <title>Snap Capsule by HORA — One private space for every event memory</title>
        <meta
          name="description"
          content="Create one beautiful, private event capsule where guests view and share all your celebration photos. QR code sharing, AI face recognition and albums."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
        <Faq />
      </main>
    </>
  );
}
