"use client";

import { useState } from "react";
import CapsuleHome from "../../components/Capsulehome";
import banner from "@/assets/snap_capsulebanner.webp";
import ShareEventModal from "../../components/Shareeventmodal";
import ShareQrModal from "../../components/Shareqrmodal";

export default function CapsuleHomePage() {
  const [shareOpen, setShareOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const eventUrl = "https://capsule.app/event/abc123";

  return (
    <>
      <CapsuleHome
        bannerSrc={banner}
        guestCount={122}
        onShare={() => setShareOpen(true)}
        onQr={() => setQrOpen(true)}
        onFilesSelected={(files) => console.log(files)}
      />

      <ShareEventModal isOpen={shareOpen} onClose={() => setShareOpen(false)} eventUrl={eventUrl} />
      <ShareQrModal isOpen={qrOpen} onClose={() => setQrOpen(false)} eventUrl={eventUrl} logoLetter="H" />
    </>
  );
}