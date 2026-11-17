import { useEffect, useRef } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Popup shell: dark overlay, × button, closes with Escape or a click
 * outside, keeps keyboard focus inside, and stops the page scrolling behind.
 *
 * @param labelledBy id of the heading inside that names the popup
 * @param focusKey   change it (e.g. when the step changes) to move focus to
 *                   the first input again
 */
export default function Modal({ open, onClose, labelledBy, focusKey, children }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [open]);

  // Focus the first text field on open and whenever the content changes step.
  useEffect(() => {
    if (!open) return undefined;
    const timer = setTimeout(() => {
      const first = dialogRef.current && dialogRef.current.querySelector('input[type="email"], input[type="text"]');
      if (first && !first.disabled) first.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, [open, focusKey]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#1e0756]/45 px-4 py-10 sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative w-full max-w-[420px]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-black/60 transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
