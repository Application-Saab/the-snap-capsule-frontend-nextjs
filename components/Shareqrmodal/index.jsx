"use client";

import "./Shareqrmodal.css";

/* ---------- Icons ---------- */
const DownloadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 3 3 10.5l6.5 2.5L12 20z" />
    <path d="M21 3 9.5 13l.5 5.5 3-3.5z" opacity="0.55" />
  </svg>
);

const HeartIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20s-7.500-4.600-7.500-10A4.300 4.300 0 0 1 12 7.500 4.300 4.300 0 0 1 19.500 10c0 5.400-7.500 10-7.500 10z" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.200 7.800L22 12l-7.800 2.200L12 22l-2.200-7.800L2 12l7.800-2.200z" />
  </svg>
);

/* ---------- Component ---------- */
export default function ShareQrModal({
  isOpen = true,
  onClose,
  qrImageSrc, // QR image: URL string (API se) ya imported image
  eventUrl = "", // optional: sirf share text me use hota hai
  fileName = "event-capsule-qr.png",
}) {
  if (!isOpen) return null;

  // Next.js static import ({ src, ... }) ya normal URL string, dono chalenge
  const src = typeof qrImageSrc === "string" ? qrImageSrc : qrImageSrc?.src;

  const getFile = async () => {
    const res = await fetch(src);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type || "image/png" });
  };

  const downloadQr = async () => {
    if (!src) return;
    try {
      const file = await getFile();
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // CORS ki wajah se fetch fail ho to image naye tab me khol do
      window.open(src, "_blank", "noopener,noreferrer");
    }
  };

  const shareQr = async () => {
    if (!src) return;
    try {
      const file = await getFile();
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "Event Capsule QR", text: eventUrl });
      } else if (navigator.share && eventUrl) {
        await navigator.share({ title: "Event Capsule", url: eventUrl });
      } else {
        downloadQr();
      }
    } catch {
      /* user ne cancel kiya ya share fail hua */
    }
  };

  return (
    <div className="qr-overlay" onClick={onClose}>
      <div className="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title" onClick={(e) => e.stopPropagation()}>
        <span className="qr-blob qr-blob--tl" aria-hidden="true" />
        <span className="qr-blob qr-blob--r" aria-hidden="true" />
        <span className="qr-sparkle" aria-hidden="true"><SparkleIcon /></span>

        <button type="button" className="qr-close" onClick={onClose} aria-label="Close">×</button>

        <h2 className="qr-title" id="qr-title">
          Share <span>QR Code</span> or Link
        </h2>
        <p className="qr-text">
          Guests can scan your QR code or click on your link to instantly upload photos and videos to your online gallery. Beautiful templates included.
        </p>

        <div className="qr-card">
          {src ? <img className="qr-img" src={src} alt="Event QR code" /> : <span className="qr-empty">QR image</span>}
        </div>

        <div className="qr-buttons">
          <button type="button" className="qr-btn qr-btn--filled" onClick={downloadQr}>
            <DownloadIcon /> Download QR
          </button>
          <button type="button" className="qr-btn qr-btn--outline" onClick={shareQr}>
            <SendIcon /> Share QR
          </button>
        </div>

        <div className="qr-note">
          <HeartIcon />
          <p>Share your QR code with guests so everyone can add their memories.</p>
        </div>
      </div>
    </div>
  );
}