import Image from "next/image";
import { useState } from "react";
import { isoDateFromToday } from "../../lib/dates";

/**
 * "Let's Create Your Capsule": asks for the event name and date, then
 * creates the capsule. Shown in the popup right after sign-in.
 *
 * @param onCreated        (capsule) => void, called after the capsule is saved
 * @param onSessionExpired () => void, called if the user is no longer signed in
 * @param headingId        id for the heading (the popup uses it as its label)
 */
export default function CreateCapsuleCard({ onCreated, onSessionExpired, headingId = "create-capsule-heading" }) {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [dateFocused, setDateFocused] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState({ field: null, message: "" });

  async function submit(event) {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError({ field: "name", message: "Please enter an event name." });
      return;
    }
    if (!eventDate) {
      setError({
        field: "eventDate",
        message: "Please choose the event date.",
      });
      return;
    }

    setBusy(true);
    setError({ field: null, message: "" });
    try {
      const res = await fetch("/api/capsules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed, eventDate }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401 && onSessionExpired) {
        onSessionExpired();
        return;
      }
      if (!res.ok) {
        setError({
          field: data.field || null,
          message: data.message || "Couldn't create the capsule. Please try again.",
        });
        setBusy(false);
        return;
      }
      onCreated(data.capsule);
    } catch {
      setError({
        field: null,
        message: "We couldn't reach the server. Please try again.",
      });
      setBusy(false);
    }
  }

  const fieldClass = (field) =>
    `h-[46px] w-full min-w-0 rounded-[10px] border bg-white/80 px-4 font-inter text-[15px] text-black outline-none placeholder:text-black/70 focus:border-brand focus:ring-2 focus:ring-brand/20 ${
      error.field === field ? "border-danger" : "border-black/10"
    }`;

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#f6eff8] to-[#fbf8fc] px-5 pb-5 pt-6 shadow-[0_10px_30px_rgba(151,83,140,0.10)]">
      <div className="flex justify-center">
        <Image
          src="/capsule/create-capsule-illustration.png"
          alt=""
          width={116}
          height={146}
          priority
          className="h-[124px] w-auto object-contain"
        />
      </div>

      <div className="mt-3 text-center">
        <h2 id={headingId} className="font-inter text-[24px] font-semibold leading-tight text-black">
          Let&apos;s Create Your <span className="text-brand">Capsule</span>
        </h2>
        <p className="mx-auto mt-2 max-w-[300px] font-inter text-[16px] leading-snug text-black/80">
          Tell us about your event and keep every memory together.
        </p>
      </div>

      <form className="mt-5 flex flex-col gap-3" onSubmit={submit} noValidate>
        <div className="flex items-center gap-2">
          <FieldIcon>
            <CakeIcon />
          </FieldIcon>
          <label htmlFor="capsule-name" className="sr-only">
            Event name
          </label>
          <input
            id="capsule-name"
            type="text"
            placeholder="Event Name"
            autoComplete="off"
            maxLength={80}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error.field === "name") setError({ field: null, message: "" });
            }}
            disabled={busy}
            aria-invalid={error.field === "name"}
            className={fieldClass("name")}
          />
        </div>

        <div className="flex items-center gap-2">
          <FieldIcon>
            <CalendarIcon />
          </FieldIcon>
          <label htmlFor="capsule-date" className="sr-only">
            Event date
          </label>
          {/* Shows "Event Date" as a placeholder, then the native date picker. */}
          <input
            id="capsule-date"
            type={dateFocused || eventDate ? "date" : "text"}
            placeholder="Event Date"
            min="1900-01-01"
            max={isoDateFromToday(5)}
            value={eventDate}
            onFocus={(e) => {
              setDateFocused(true);
              const input = e.target;
              requestAnimationFrame(() => {
                try {
                  if (input.showPicker) input.showPicker();
                } catch {
                  // Some browsers only open the picker on a direct click.
                }
              });
            }}
            onBlur={() => setDateFocused(false)}
            onChange={(e) => {
              setEventDate(e.target.value);
              if (error.field === "eventDate") setError({ field: null, message: "" });
            }}
            disabled={busy}
            aria-invalid={error.field === "eventDate"}
            className={fieldClass("eventDate")}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="mt-1 flex h-[50px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand font-inter text-[17px] font-bold text-white shadow-[0_4px_10px_rgba(151,83,140,0.25)] transition hover:bg-[#82467a] disabled:opacity-60"
        >
          {busy ? (
            "Creating your capsule…"
          ) : (
            <>
              Create Event Capsule <span aria-hidden>→</span>
            </>
          )}
        </button>
      </form>

      <p className="mt-2 min-h-[18px] text-center font-inter text-[12px]" role="status" aria-live="polite">
        {error.message ? (
          <span className="text-danger">{error.message}</span>
        ) : (
          <span className="text-black/50">Let&apos;s make your memories timeless!</span>
        )}
      </p>

      <div className="mt-3 flex items-center gap-3 rounded-[12px] bg-brand/10 px-4 py-3">
        <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-brand" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3zm-1.2 13.6l5.3-5.3-1.4-1.4-3.9 3.9-1.9-1.9-1.4 1.4 3.3 3.3z"
          />
        </svg>
        <div className="font-inter">
          <p className="text-[14px] font-semibold text-brand">Your memories are safe with us.</p>
          <p className="text-[11px] text-black/60">Only You and your guests can access your capsule.</p>
        </div>
      </div>
    </section>
  );
}

function FieldIcon({ children }) {
  return (
    <span
      className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[10px] bg-brand/10 text-brand"
      aria-hidden
    >
      {children}
    </span>
  );
}

function CakeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16M5 20v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" />
      <path d="M5 16c1.2 0 1.2 1 2.3 1s1.2-1 2.4-1 1.2 1 2.3 1 1.2-1 2.3-1 1.2 1 2.4 1 1.1-1 2.3-1" />
      <path d="M8 12V9M12 12V9M16 12V9" />
      <path d="M8 6.5c0-.8.8-1.5.8-1.5s.7.7.7 1.5a.75.75 0 0 1-1.5 0zM11.25 6.5c0-.8.75-1.5.75-1.5s.75.7.75 1.5a.75.75 0 0 1-1.5 0zM15.25 6.5c0-.8.75-1.5.75-1.5s.75.7.75 1.5a.75.75 0 0 1-1.5 0z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <text
        x="12"
        y="17.6"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        fontFamily="Inter, sans-serif"
      >
        19
      </text>
    </svg>
  );
}
