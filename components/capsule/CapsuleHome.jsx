import Image from "next/image";
import { useEffect, useState } from "react";
import { formatEventDateLong } from "../../lib/dates";

const FEATURES = [
  { icon: "face", title: "Face Recognition", text: "Find yourself easily" },
  { icon: "folder", title: "Folder Creation", text: "Organize memories" },
  { icon: "guests", title: "Guest Sharing", text: "Share once with everyone" },
  { icon: "privacy", title: "Privacy First", text: "You're in control" },
];

// Uploads, albums, sharing and the QR code need photo storage and the guest
// page, which come next. Until then these buttons explain that.
const SOON = {
  album: "Albums are coming soon.",
  photos: "Photo uploads are coming soon.",
  guests: "You'll see guests here once they join with your link.",
  share: "Sharing your capsule link is coming soon.",
  qr: "Your capsule QR code is coming soon.",
};

/**
 * The host's view of one capsule: welcome banner, quick actions and the
 * photo upload area.
 *
 * @param capsule  { id, name, eventDate, shareCode }
 * @param hostName the signed-in user's name (optional)
 */
export default function CapsuleHome({ capsule, hostName }) {
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return undefined;
    const t = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  const firstName = hostName ? hostName.trim().split(/\s+/)[0] : "";
  const title = firstName ? `Welcome to ${firstName}'s ${capsule.name}` : `Welcome to ${capsule.name}`;

  return (
    <div className="mx-auto w-full max-w-[780px] pb-10">
      {/* Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#efe4fb] via-[#f7f0fd] to-[#e6d8f6] px-4 pb-4 pt-5 sm:mx-4 sm:mt-4 sm:rounded-[20px]">
        <Image
          src="/capsule/create-capsule-illustration.png"
          alt=""
          width={116}
          height={146}
          priority
          className="pointer-events-none absolute -right-1 top-6 h-[132px] w-auto opacity-95 sm:right-6 sm:h-[170px]"
        />
        <div className="relative max-w-[66%] sm:max-w-[70%]">
          <h1 className="font-poppins text-[19px] font-bold leading-[1.25] text-brand-ink [overflow-wrap:anywhere] sm:text-[24px]">
            {title}
          </h1>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-ink px-3 py-[5px] font-inter text-[13px] font-semibold text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
              <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
            </svg>
            <span>{formatEventDateLong(capsule.eventDate)}</span>
          </p>
        </div>

        <ul className="relative mt-4 grid max-w-[78%] grid-cols-4 gap-[6px] sm:max-w-[72%] sm:gap-3">
          {FEATURES.map((f) => (
            <li key={f.title} className="flex flex-col items-center rounded-[8px] bg-white/85 px-1 py-2 text-center shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
              <FeatureIcon name={f.icon} />
              <span className="mt-1 font-inter text-[8.5px] font-semibold leading-tight text-black sm:text-[11px]">{f.title}</span>
              <span className="mt-[2px] font-inter text-[7.5px] leading-tight text-black/50 sm:text-[10px]">{f.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Quick actions */}
      <section className="mt-5 px-3" aria-label="Capsule actions">
        <ul className="flex items-start justify-between sm:justify-center sm:gap-8">
          <Action label="Create Album" onClick={() => setNotice(SOON.album)}>
            <ActionIcon name="album" />
          </Action>
          <Action label="Add Photos" onClick={() => setNotice(SOON.photos)}>
            <ActionIcon name="photos" />
          </Action>
          <Action label="Guest Joined" onClick={() => setNotice(SOON.guests)} badge={0}>
            <ActionIcon name="guests" />
          </Action>
          <li aria-hidden className="mt-2 h-10 w-px self-start bg-black/10" />
          <Action label="Share Capsule" tone="green" onClick={() => setNotice(SOON.share)}>
            <ActionIcon name="share" />
          </Action>
          <Action label="QR Code" tone="green" onClick={() => setNotice(SOON.qr)}>
            <ActionIcon name="qr" />
          </Action>
        </ul>
      </section>

      <p className="mt-3 min-h-[20px] px-4 text-center font-inter text-[13px] text-brand" role="status" aria-live="polite">
        {notice}
      </p>

      {/* Upload area */}
      <section className="mx-3 mt-2 flex flex-col items-center rounded-[16px] border-2 border-dashed border-brand/50 px-6 py-8 text-center">
        <svg viewBox="0 0 48 48" className="h-12 w-12 text-brand" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 34h-2a9 9 0 0 1-1-17.9A13 13 0 0 1 36 14a8 8 0 0 1 1 16" />
          <path d="M24 40V22M17 29l7-7 7 7" />
        </svg>
        <h2 className="mt-3 font-inter text-[20px] font-bold text-black">Add your photos</h2>
        <p className="mt-1 font-inter text-[14px] text-black/70">Upload photos from your phone or gallery</p>
        <button
          type="button"
          onClick={() => setNotice(SOON.photos)}
          className="mt-6 h-[46px] w-full max-w-[260px] rounded-[10px] bg-brand font-inter text-[16px] font-semibold text-white shadow-[0_4px_10px_rgba(151,83,140,0.25)] transition hover:bg-[#82467a]"
        >
          + Add Photos
        </button>
      </section>
    </div>
  );
}

function Action({ label, onClick, tone = "brand", badge, children }) {
  const box =
    tone === "green"
      ? "border-[#3cb371] bg-white text-[#2e9d5f]"
      : "border-brand/25 bg-brand/10 text-brand";
  return (
    <li className="flex w-[64px] flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        className={`relative flex h-[50px] w-[50px] items-center justify-center rounded-[10px] border transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${box}`}
        aria-label={badge ? `${label}: ${badge}` : label}
      >
        {children}
        {badge ? (
          <span className="absolute -right-2 -top-2 rounded-full bg-brand px-[6px] py-[1px] font-inter text-[10px] font-semibold text-white">
            {badge}
          </span>
        ) : null}
      </button>
      <span className="mt-1.5 text-center font-inter text-[11px] leading-tight text-black/70">{label}</span>
    </li>
  );
}

function ActionIcon({ name }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    album: (
      <>
        <path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" fill="currentColor" stroke="none" />
        <path d="M12 11v5M9.5 13.5h5" stroke="#fff" />
      </>
    ),
    photos: (
      <>
        <rect x="3.5" y="5.5" width="13" height="13" rx="2" />
        <path d="M3.5 15l3.5-3.5 3 3 2-2 4.5 4.5" />
        <circle cx="12.5" cy="9.5" r="1.3" />
        <path d="M19 4v5M16.5 6.5h5" />
      </>
    ),
    guests: (
      <>
        <circle cx="9" cy="8.5" r="3" fill="currentColor" stroke="none" />
        <path d="M3.5 19c.5-3.2 2.8-5 5.5-5s5 1.8 5.5 5z" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="9.5" r="2.4" />
        <path d="M15 14.3c2.6-.4 5 1.1 5.5 4.7" />
      </>
    ),
    share: (
      <>
        <path d="M3 11l17-7-4 16-5-5-3 3v-5z" fill="currentColor" fillOpacity=".15" />
        <rect x="14" y="14" width="7" height="6" rx="1.2" fill="currentColor" stroke="none" />
        <path d="M15.5 14v-1.2a2 2 0 0 1 4 0V14" />
      </>
    ),
    qr: (
      <>
        <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
        <rect x="7.5" y="7.5" width="3.5" height="3.5" rx=".5" />
        <rect x="13" y="7.5" width="3.5" height="3.5" rx=".5" />
        <rect x="7.5" y="13" width="3.5" height="3.5" rx=".5" />
        <path d="M13 13h1.5v1.5H13zM15.5 15.5h1v1h-1z" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" {...common} aria-hidden>
      {paths[name]}
    </svg>
  );
}

function FeatureIcon({ name }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    face: (
      <>
        <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
        <circle cx="12" cy="11" r="3" />
        <path d="M8 17c1-1.6 2.4-2.4 4-2.4s3 .8 4 2.4" />
      </>
    ),
    folder: <path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />,
    guests: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M6 19c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
      </>
    ),
    privacy: (
      <>
        <path d="M12 3l7 2.6v5.2c0 4.4-3 8.1-7 9.7-4-1.6-7-5.3-7-9.7V5.6z" fill="currentColor" fillOpacity=".15" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  };
  return (
    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-brand/10 text-brand sm:h-7 sm:w-7">
      <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] sm:h-[18px] sm:w-[18px]" {...common} aria-hidden>
        {paths[name]}
      </svg>
    </span>
  );
}
