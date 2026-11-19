import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

/**
 * Google's official round "G" sign-in button (Google Identity Services).
 * When the user approves, Google calls back with an ID token, which is
 * passed to `onCredential`.
 */
export default function GoogleSignInButton({ onCredential, disabled = false }) {
  const holder = useRef(null);
  const callbackRef = useRef(onCredential);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  callbackRef.current = onCredential;

  const render = useCallback(() => {
    const gis = typeof window !== "undefined" && window.google && window.google.accounts && window.google.accounts.id;
    if (!gis || !holder.current || !CLIENT_ID) return;
    gis.initialize({
      client_id: CLIENT_ID,
      callback: (response) => callbackRef.current(response.credential),
      ux_mode: "popup",
      context: "signin",
      itp_support: true,
    });
    holder.current.innerHTML = "";
    gis.renderButton(holder.current, {
      type: "icon",
      shape: "circle",
      theme: "outline",
      size: "large",
    });
    setReady(true);
  }, []);

  // The script may already be loaded when navigating back to this page.
  useEffect(() => {
    render();
  }, [render]);

  if (!CLIENT_ID) {
    return <CircleShell title="Google sign-in is not configured" muted />;
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={render}
        onReady={render}
        onError={() => setFailed(true)}
      />
      <span
        className={`relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${
          disabled ? "pointer-events-none opacity-60" : ""
        }`}
        title={failed ? "Google sign-in couldn't load. Check your connection and refresh." : "Continue with Google"}
      >
        {!ready ? <GoogleMark className="absolute h-6 w-6" /> : null}
        <span ref={holder} aria-label="Continue with Google" />
      </span>
    </>
  );
}

function CircleShell({ title, muted }) {
  return (
    <span
      className={`flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${
        muted ? "opacity-50" : ""
      }`}
      title={title}
      aria-label={title}
    >
      <GoogleMark className="h-6 w-6" />
    </span>
  );
}

// Static Google "G", shown while the official button loads.
function GoogleMark({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
