import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";

const RESEND_FALLBACK_SECONDS = 60;

/**
 * The Snap Capsule login card: email + 6-digit code, or Google.
 * Used on the /login page and inside the login popup on the home page.
 *
 * @param next           where to go after signing in
 * @param headingId      id for the heading (the popup uses it as its label)
 * @param replaceHistory true on /login so Back doesn't return to the form
 * @param onSignedIn     if given, called after sign-in instead of navigating
 *                       (the Create Capsule popup moves on to its next step)
 */
export default function LoginCard({ next = "/account", headingId = "login-heading", replaceHistory = true, onSignedIn }) {
  const router = useRouter();
  const finish = () => {
    if (onSignedIn) {
      onSignedIn();
      return;
    }
    if (replaceHistory) router.replace(next);
    else router.push(next);
  };
  const [step, setStep] = useState("email"); // email | code
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(null); // null | "send" | "verify" | "google"
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const codeInput = useRef(null);

  // Resend countdown.
  useEffect(() => {
    if (resendIn <= 0) return undefined;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  useEffect(() => {
    if (step === "code" && codeInput.current) codeInput.current.focus();
  }, [step]);

  async function post(url, body) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  }

  async function sendCode(event) {
    if (event) event.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setBusy("send");
    setError("");
    setInfo("");
    try {
      const { ok, data } = await post("/api/auth/email/request-otp", { email: trimmed });
      if (!ok) {
        if (data.retryAfter) setResendIn(Number(data.retryAfter));
        // Cooldown means a code was already sent: let the user enter it.
        if (data.code === "OTP_COOLDOWN") setStep("code");
        throw new Error(data.message || "We couldn't send the code. Please try again.");
      }
      setEmail(data.email || trimmed);
      setCode("");
      setStep("code");
      setResendIn(Number(data.resendAfterSeconds) || RESEND_FALLBACK_SECONDS);
      setInfo(data.message || `We've sent a 6-digit code to ${trimmed}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(null);
    }
  }

  async function verifyCode(event) {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code from the email.");
      return;
    }
    setBusy("verify");
    setError("");
    try {
      const { ok, data } = await post("/api/auth/email/verify-otp", { email, code });
      if (!ok) {
        if (data.code === "OTP_EXPIRED" || data.code === "OTP_TOO_MANY_ATTEMPTS") {
          setCode("");
          setResendIn(0);
        }
        throw new Error(data.message || "That code didn't work. Please try again.");
      }
      finish();
    } catch (err) {
      setError(err.message);
      setBusy(null);
    }
  }

  async function handleGoogleCredential(credential) {
    setBusy("google");
    setError("");
    try {
      const { ok, data } = await post("/api/auth/google", { credential });
      if (!ok) throw new Error(data.message || "Google sign-in failed. Please try again.");
      finish();
    } catch (err) {
      setError(err.message);
      setBusy(null);
    }
  }

  function changeEmail() {
    setStep("email");
    setCode("");
    setError("");
    setInfo("");
  }

  const resendLabel =
    resendIn > 0
      ? `Resend code in ${Math.floor(resendIn / 60)}:${String(resendIn % 60).padStart(2, "0")}`
      : "Resend code";

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#f4ecf6] via-[#faf6fb] to-white px-6 pb-6 pt-8 shadow-[0_10px_30px_rgba(151,83,140,0.10)]">
      <Swirl />
      <Sparkle className="left-5 top-[110px] h-4 w-4 text-brand/40" />
      <Sparkle className="left-[60px] top-[135px] h-5 w-5 text-brand/50" />
      <Sparkle className="right-6 top-[150px] h-4 w-4 text-[#f0a8c8]" />
      <Sparkle className="bottom-4 left-5 h-5 w-5 text-brand/30" />

      <div className="relative text-center">
        <p className="font-inter text-[16px] font-medium text-[#6d6a9c]">Welcome to Snap Capsule</p>
        <h1 id={headingId} className="mt-1 font-poppins text-[34px] font-bold leading-tight text-brand-ink">
          Get{" "}
          <span className="relative inline-block text-brand">
            Started
            <Underline />
          </span>
        </h1>
        <p className="mt-3 font-inter text-[16px] text-[#6d6a9c]">
          {step === "email" ? "Login with your email address" : "Enter the code we emailed you"}
        </p>
      </div>

      {step === "email" ? (
        <form className="relative mt-6" onSubmit={sendCode} noValidate>
          <label htmlFor="login-email" className="sr-only">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            inputMode="email"
            placeholder="Enter Your Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy !== null}
            className="h-[52px] w-full rounded-[12px] border border-black/10 bg-white px-4 font-inter text-[16px] text-black shadow-[0_2px_8px_rgba(0,0,0,0.06)] outline-none placeholder:text-black/40 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="submit"
            disabled={busy !== null}
            className="mt-5 flex h-[50px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand font-inter text-[18px] font-bold text-white shadow-[0_4px_10px_rgba(151,83,140,0.25)] transition hover:bg-[#82467a] disabled:opacity-60"
          >
            {busy === "send" ? "Sending code…" : <>Get OTP <span aria-hidden>→</span></>}
          </button>
        </form>
      ) : (
        <form className="relative mt-6" onSubmit={verifyCode} noValidate>
          <p className="text-center font-inter text-[14px] text-black/70">
            Code sent to <strong className="font-semibold text-black">{email}</strong>{" "}
            <button type="button" onClick={changeEmail} className="font-medium text-brand underline-offset-2 hover:underline">
              Change
            </button>
          </p>
          <label htmlFor="login-code" className="sr-only">
            6-digit code
          </label>
          <input
            id="login-code"
            ref={codeInput}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="••••••"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            disabled={busy !== null}
            className="mt-3 h-[56px] w-full rounded-[12px] border border-black/10 bg-white px-4 text-center font-inter text-[26px] font-semibold tracking-[0.5em] text-brand-ink shadow-[0_2px_8px_rgba(0,0,0,0.06)] outline-none placeholder:text-black/25 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="submit"
            disabled={busy !== null || code.length !== 6}
            className="mt-5 flex h-[50px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand font-inter text-[18px] font-bold text-white shadow-[0_4px_10px_rgba(151,83,140,0.25)] transition hover:bg-[#82467a] disabled:opacity-60"
          >
            {busy === "verify" ? "Verifying…" : <>Verify &amp; Continue <span aria-hidden>→</span></>}
          </button>
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => sendCode()}
              disabled={resendIn > 0 || busy !== null}
              className="font-inter text-[13px] font-medium text-brand disabled:text-black/40"
            >
              {busy === "send" ? "Sending…" : resendLabel}
            </button>
          </div>
        </form>
      )}

      <div className="relative mt-4 min-h-[20px] text-center font-inter text-[13px]" role="status" aria-live="polite">
        {error ? <span className="text-danger">{error}</span> : null}
        {!error && info && step === "code" ? <span className="text-black/60">{info} It&apos;s valid for 10 minutes.</span> : null}
        {!error && busy === "google" ? <span className="text-brand">Signing you in…</span> : null}
      </div>

      {step === "email" ? (
        <>
          <div className="relative mt-2 flex items-center gap-3 font-inter text-[13px] text-black/40" aria-hidden>
            <span className="h-px flex-1 bg-black/10" />
            OR
            <span className="h-px flex-1 bg-black/10" />
          </div>

          <div className="relative mt-5 flex items-center justify-center gap-[50px]">
            <GoogleSignInButton onCredential={handleGoogleCredential} disabled={busy !== null} />
            <ComingSoonCircle label="Sign in with Apple (coming soon)">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#1677ff]" aria-hidden>
                <path
                  fill="currentColor"
                  d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.47-.03-.01-2.27-.87-2.29-3.51zM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21z"
                />
              </svg>
            </ComingSoonCircle>
            <ComingSoonCircle label="More sign-in options (coming soon)">
              <span className="flex gap-[3px]" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-[6px] w-[6px] rounded-full bg-black/25" />
                ))}
              </span>
            </ComingSoonCircle>
          </div>
        </>
      ) : null}

      <ul className="relative mt-6 flex items-center justify-center gap-3 font-inter text-[11px] text-brand">
        <TrustItem icon="shield">Secure Login</TrustItem>
        <span className="h-3 w-px bg-brand/30" aria-hidden />
        <TrustItem icon="bolt">Fast &amp; Easy</TrustItem>
        <span className="h-3 w-px bg-brand/30" aria-hidden />
        <TrustItem icon="headset">24/7 Support</TrustItem>
      </ul>
    </section>
  );
}

function ComingSoonCircle({ label, children }) {
  return (
    <button
      type="button"
      disabled
      aria-label={label}
      title={label}
      className="flex h-[52px] w-[52px] cursor-not-allowed items-center justify-center rounded-full bg-white opacity-60 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
    >
      {children}
    </button>
  );
}

function TrustItem({ icon, children }) {
  const paths = {
    shield: (
      <>
        <path d="M8 1.5l5.5 2v4.2c0 3.3-2.3 5.7-5.5 6.8-3.2-1.1-5.5-3.5-5.5-6.8V3.5z" />
        <path d="M5.5 8l1.7 1.7L10.6 6.3" />
      </>
    ),
    bolt: <path d="M9.5 1.5L3 9.5h5l-1 5 6.5-8h-5z" />,
    headset: (
      <>
        <path d="M2.5 9V8a5.5 5.5 0 0 1 11 0v1" />
        <rect x="2" y="9" width="3" height="4" rx="1" />
        <rect x="11" y="9" width="3" height="4" rx="1" />
      </>
    ),
  };
  return (
    <li className="flex items-center gap-1">
      <svg viewBox="0 0 16 16" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {paths[icon]}
      </svg>
      {children}
    </li>
  );
}

function Sparkle({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={`pointer-events-none absolute ${className}`} aria-hidden>
      <path fill="currentColor" d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0z" />
    </svg>
  );
}

function Underline() {
  return (
    <svg viewBox="0 0 160 14" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-[10px] w-full text-brand" aria-hidden>
      <path d="M3 10c40-7 100-9 154-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Swirl() {
  return (
    <svg viewBox="0 0 200 120" className="pointer-events-none absolute -left-6 -top-4 h-[120px] w-[200px] text-brand/10" aria-hidden>
      <path d="M0 90C40 40 90 20 200 10" fill="none" stroke="currentColor" strokeWidth="26" strokeLinecap="round" />
      <path d="M0 60C50 20 110 5 190 0" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}
