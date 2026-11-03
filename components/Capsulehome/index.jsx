import { useRef, useState } from "react";
import "./CapsuleHome.css";
import Image from "next/image";

/* ---------- Inline icons ---------- */

const FolderPlusIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="currentColor" fillOpacity="0.9" stroke="none" />
    <path d="M12 11v5M9.5 13.5h5" stroke="#fff" />
  </svg>
);

const ImagePlusIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
    <path d="m4 16 4.5-4.5 3.5 3.5 2-2 6 6" />
    <circle cx="9" cy="9" r="1.4" />
    <path d="M18 3v6M15 6h6" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
    <circle cx="9" cy="8" r="3.6" />
    <path d="M2.5 19.5c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6z" />
    <circle cx="17" cy="9" r="2.6" opacity="0.75" />
    <path d="M16.5 13.6c3 0 5 1.8 5 4.4v1.5h-4.2c0-2.3-.5-4-.8-5.9z" opacity="0.75" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M21 3 3 10.5l6.5 2.5L12 20z" />
    <path d="M21 3 9.5 13l.5 5.5 3-3.5z" opacity="0.55" />
  </svg>
);

const QrIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
    <rect x="8" y="8" width="3" height="3" fill="currentColor" />
    <rect x="13" y="8" width="3" height="3" fill="currentColor" />
    <rect x="8" y="13" width="3" height="3" fill="currentColor" />
    <path d="M13.5 14.5h2.5v2" />
  </svg>
);

const CloudUploadIcon = () => (
  <svg viewBox="0 0 24 24" width="39" height="39" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4.75 4.75 0 0 1-.5 9.5" />
    <path d="M12 21v-8M8.8 15.8 12 12.6l3.2 3.2" />
  </svg>
);

/* ---------- Reusable action button ---------- */

function ActionItem({ icon, label, onClick, variant = "purple", badge }) {
  return (
    <button type="button" className="ch-action" onClick={onClick}>
      <span className={`ch-action-box ch-action-box--${variant}`}>
        {icon}
        {badge ? <span className="ch-badge">{badge}</span> : null}
      </span>
      <span className="ch-action-label">{label}</span>
    </button>
  );
}

/* ---------- Main component ---------- */

export default function CapsuleHome({
  bannerSrc, // your banner image path / URL
  bannerAlt = "Event banner",
  guestCount = 0,
  onCreateAlbum,
  onGuests,
  onShare,
  onQr,
  onFilesSelected, // (File[]) => void
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (files.length) onFilesSelected?.(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="ch-page">
      {/* ===== Banner ===== */}
      <div className="ch-banner">
  {bannerSrc ? (
    <Image
      src={bannerSrc}
      alt={bannerAlt}
      fill
      sizes="(max-width: 420px) 100vw, 420px"
      priority
      className="ch-banner-img"
    />
  ) : (
    <div className="ch-banner-placeholder">Add your banner image</div>
  )}
</div>

      {/* ===== Action row ===== */}
      <div className="ch-actions">
        <ActionItem icon={<FolderPlusIcon />} label="Create Album" onClick={onCreateAlbum} />
        <ActionItem icon={<ImagePlusIcon />} label="Add Photos" onClick={openPicker} />
        <ActionItem icon={<UsersIcon />} label="Guest Joined" onClick={onGuests} badge={guestCount} />

        <span className="ch-divider" aria-hidden="true" />

        <ActionItem icon={<SendIcon />} label="Share Capsule" onClick={onShare} variant="green" />
        <ActionItem icon={<QrIcon />} label="QR Code" onClick={onQr} variant="green" />
      </div>

      {/* ===== Upload box ===== */}
      <div
        className={`ch-upload ${dragging ? "is-dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <span className="ch-upload-icon"><CloudUploadIcon /></span>
        <h3 className="ch-upload-title">Add your photos</h3>
        <p className="ch-upload-text">Upload photos from your phone or gallery</p>
        <button type="button" className="ch-upload-btn" onClick={openPicker}>
          + Add Photos
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}