import { useState } from "react";
import "./ShareEventModal.css";

const DEFAULT_URL = "https://capsule.app/event/abc123"; // static, baad me API se bhejna
const SHARE_TEXT = "Join my event capsule and share your memories!";

/* ---------- Icons ---------- */
const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2b2150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="38" height="38" viewBox="0 0 32 32">
    <path d="M16 3a13 13 0 0 0-11 19.8L3 29l6.4-2A13 13 0 1 0 16 3z" fill="none" stroke="#25D366" strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M11.5 10c.6-.6 1.3-.4 1.6.3l.8 1.8c.2.5 0 .9-.4 1.3l-.5.5c.8 1.6 2.2 2.9 3.9 3.7l.6-.7c.4-.4.8-.5 1.3-.2l1.7.9c.6.3.8 1 .3 1.6-1 1.2-2.4 1.5-3.9 1-3.3-1.1-6-3.8-6.9-7-.3-1.2 0-2.3.5-3.2z" fill="#25D366" />
  </svg>
);

const SmsIcon = () => (
  <svg width="38" height="38" viewBox="0 0 32 32">
    <path d="M6 4h20a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H15l-6 5v-5H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" fill="#8e4a8e" />
    <rect x="9" y="10" width="14" height="2.4" rx="1.2" fill="#fff" />
    <rect x="9" y="15" width="9" height="2.4" rx="1.2" fill="#fff" />
  </svg>
);

const GmailIcon = () => (
  <svg width="40" height="40" viewBox="0 0 32 32">
    <rect x="3" y="6" width="26" height="20" rx="3" fill="#fff" />
    <path d="M3 9v15a2 2 0 0 0 2 2h3V12z" fill="#4285F4" />
    <path d="M29 9v15a2 2 0 0 1-2 2h-3V12z" fill="#34A853" />
    <path d="M8 12l8 6 8-6V8l-8 6-8-6z" fill="#EA4335" />
    <path d="M24 12V8l3-2a2 2 0 0 1 2 2v1z" fill="#FBBC04" />
    <path d="M8 12V8L5 6a2 2 0 0 0-2 2v1z" fill="#C5221F" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="42" height="42" viewBox="0 0 32 32">
    <defs>
      <linearGradient id="igGrad" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#feda75" />
        <stop offset="0.35" stopColor="#fa7e1e" />
        <stop offset="0.6" stopColor="#d62976" />
        <stop offset="1" stopColor="#4f5bd5" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#igGrad)" />
    <rect x="7.5" y="7.5" width="17" height="17" rx="5" fill="none" stroke="#fff" strokeWidth="2" />
    <circle cx="16" cy="16" r="4" fill="none" stroke="#fff" strokeWidth="2" />
    <circle cx="21.2" cy="10.8" r="1.2" fill="#fff" />
  </svg>
);

const SnapchatIcon = () => (
  <svg width="42" height="42" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="6" fill="#FFFC00" />
    <path d="M16 6c-3 0-5 2.2-5 5v2.5c-.8.3-1.6.4-2 .6-.5.3-.3.9.2 1.1.6.2 1.3.4 1.6.6-.6 1.8-2 3.3-3.6 3.8-.5.2-.4.8.1 1 1 .4 2 .5 2.6.7.2.5.3 1.2.6 1.3.5.2 1.4-.2 2.4.1 1.2.4 2 1.8 3.1 1.8s1.9-1.4 3.1-1.8c1-.3 1.9.1 2.4-.1.3-.1.4-.8.6-1.3.6-.2 1.6-.3 2.6-.7.5-.2.6-.8.1-1-1.6-.5-3-2-3.6-3.8.3-.2 1-.4 1.6-.6.5-.2.7-.8.2-1.1-.4-.2-1.2-.3-2-.6V11c0-2.800-2-5-5-5z" fill="#fff" stroke="#111" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const MessengerIcon = () => (
  <svg width="42" height="42" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="#3b4fc4" />
    <path d="M7.5 19.5l5-6.200 3.500 3.200 5.500-4.700-4.800 7.700-3.600-3.200z" fill="#fff" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="38" height="38" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="5" fill="#0A66C2" />
    <rect x="6.500" y="12" width="3.600" height="12" fill="#fff" />
    <circle cx="8.300" cy="8.300" r="2.100" fill="#fff" />
    <path d="M13 12h3.400v1.700c.6-1.100 1.900-2 3.700-2 3.200 0 3.900 2.100 3.900 4.900V24h-3.600v-6.200c0-1.400-.1-2.900-1.900-2.900s-2.100 1.400-2.100 2.800V24H13z" fill="#fff" />
  </svg>
);

const GuestsIllustration = () => (
  <svg width="86" height="66" viewBox="0 0 86 66" aria-hidden="true">
    <rect x="22" y="4" width="30" height="52" rx="6" fill="#fff" stroke="#8e4a8e" strokeWidth="2" />
    <circle cx="37" cy="26" r="9" fill="#8e4a8e" />
    <circle cx="37" cy="26" r="4" fill="#fff" />
    <circle cx="14" cy="38" r="6" fill="#f4c7a8" />
    <path d="M5 62c0-10 4-16 9-16s9 6 9 16z" fill="#6b5bd2" />
    <circle cx="62" cy="36" r="6" fill="#f4c7a8" />
    <path d="M53 62c0-10 4-16 9-16s9 6 9 16z" fill="#c35bb0" />
    <path d="M70 10l1.800 4 4 1.800-4 1.800-1.800 4-1.800-4-4-1.800 4-1.800z" fill="#8e4a8e" />
  </svg>
);

/* ---------- Data ---------- */
const directApps = [
  { id: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon, href: (u) => `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${u}`)}` },
  { id: "sms", label: "Message", Icon: SmsIcon, href: (u) => `sms:?&body=${encodeURIComponent(`${SHARE_TEXT} ${u}`)}` },
  { id: "gmail", label: "Gmail", Icon: GmailIcon, href: (u) => `mailto:?subject=${encodeURIComponent("Event Capsule")}&body=${encodeURIComponent(`${SHARE_TEXT} ${u}`)}` },
];

const manualApps = [
  { id: "instagram", label: "Instagram", Icon: InstagramIcon },
  { id: "snapchat", label: "Snapchat", Icon: SnapchatIcon },
  { id: "messenger", label: "Messenger", Icon: MessengerIcon },
  { id: "linkedin", label: "LinkedIn", Icon: LinkedInIcon, href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
];

/* ---------- Component ---------- */
export default function ShareEventModal({ isOpen = true, onClose, eventUrl = DEFAULT_URL }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", eventUrl);
    }
  };

  const openHref = (url) => window.open(url, "_blank", "noopener,noreferrer");

  // Jin apps me direct share URL nahi hota (Instagram, Snapchat, Messenger) unke liye
  // phone ki native share sheet, warna link copy.
  const handleManual = async (app) => {
    if (app.href) return openHref(app.href(eventUrl));
    if (navigator.share) {
      try {
        await navigator.share({ title: "Event Capsule", text: SHARE_TEXT, url: eventUrl });
        return;
      } catch {
        /* user cancelled */
      }
    }
    copyLink();
  };

  return (
    <div className="share-overlay" onClick={onClose}>
      <div className="share-modal" role="dialog" aria-modal="true" aria-labelledby="share-title" onClick={(e) => e.stopPropagation()}>
        <h2 className="share-title" id="share-title">
          Share Event <span>Capsule</span>
        </h2>

        <div className="share-box">
          <div className="share-box-head">
            <LinkIcon />
            <div>
              <h3>Share Directly</h3>
              <p>Tap on any of these apps to your event instantly</p>
            </div>
          </div>
          <div className="share-apps share-apps-3">
            {directApps.map(({ id, label, Icon, href }) => (
              <button key={id} className="share-app-btn" aria-label={label} onClick={() => openHref(href(eventUrl))}>
                <Icon />
              </button>
            ))}
          </div>
        </div>

        <div className="share-box">
          <div className="share-box-head">
            <LinkIcon />
            <div>
              <h3>Copy Link (Share Manually)</h3>
              <p>Use the link to share on apps that don't support direct sharing</p>
            </div>
          </div>

          <div className="share-link-row">
            <LinkIcon />
            <div className="share-link-text">
              <strong>Event Link</strong>
              <span>{eventUrl}</span>
            </div>
            <button className="share-copy-btn" onClick={copyLink}>
              <CopyIcon /> {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          <div className="share-apps share-apps-4">
            {manualApps.map((app) => (
              <button key={app.id} className="share-app-btn" aria-label={app.label} onClick={() => handleManual(app)}>
                <app.Icon />
              </button>
            ))}
          </div>
        </div>

        <div className="share-promo">
          <GuestsIllustration />
          <div>
            <h4>Let your guests be a part of the moment!</h4>
            <p>Share the event capsule and make your memories even more special.</p>
          </div>
        </div>
      </div>
    </div>
  );
}