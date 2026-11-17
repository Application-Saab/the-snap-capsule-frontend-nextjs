import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

/**
 * One box per digit of the login code.
 * Typing moves to the next box, Backspace moves back, arrow keys move
 * between boxes, and pasting (or the phone's one-time-code autofill) fills
 * every box at once.
 *
 * @param length   number of digits
 * @param value    the code so far, e.g. "42"
 * @param onChange (code) => void, digits only
 */
const OtpInput = forwardRef(function OtpInput({ length, value, onChange, disabled = false, invalid = false }, ref) {
  const boxes = useRef([]);
  // Box to focus once the new value has rendered (focusing straight away
  // would run before React updates the boxes).
  const pendingFocus = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      const next = Math.min(value.length, length - 1);
      if (boxes.current[next]) boxes.current[next].focus();
    },
  }));

  const focusBox = (i) => {
    const box = boxes.current[Math.max(0, Math.min(i, length - 1))];
    if (box) {
      box.focus();
      box.select();
    }
  };

  useEffect(() => {
    if (pendingFocus.current === null) return;
    const i = pendingFocus.current;
    pendingFocus.current = null;
    focusBox(i);
  });

  // Writes `digits` starting at box `start` and moves focus after them.
  function fill(start, digits) {
    const chars = value.padEnd(length, " ").split("");
    let i = start;
    for (const d of digits) {
      if (i >= length) break;
      chars[i] = d;
      i += 1;
    }
    // Keep the code contiguous: stop at the first empty box.
    const joined = chars.join("");
    const firstGap = joined.indexOf(" ");
    const next = firstGap === -1 ? joined : joined.slice(0, firstGap);
    if (next === value) {
      // Same digit typed again: nothing re-renders, so move focus now.
      focusBox(i);
      return;
    }
    pendingFocus.current = i;
    onChange(next);
  }

  function handleChange(i, event) {
    const digits = event.target.value.replace(/\D/g, "");
    if (!digits) return;
    // A full code arriving in one box (autofill) fills from the start.
    if (digits.length >= length) fill(0, digits.slice(0, length));
    // Otherwise the newest digit typed replaces this box.
    else fill(Math.min(i, value.length), digits.slice(-1));
  }

  function handleKeyDown(i, event) {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (i < value.length) {
        // Clear this box and everything after it, so the code stays contiguous.
        pendingFocus.current = i;
        onChange(value.slice(0, i));
      } else if (value.length > 0) {
        pendingFocus.current = value.length - 1;
        onChange(value.slice(0, -1));
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusBox(i - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusBox(Math.min(i + 1, value.length));
    }
  }

  function handlePaste(event) {
    const digits = (event.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (!digits) return;
    event.preventDefault();
    fill(0, digits.slice(0, length));
  }

  return (
    <div className="flex justify-center gap-3" role="group" aria-label={`${length}-digit code`}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            boxes.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={i === 0 ? length : 1}
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={invalid || undefined}
          value={value[i] || ""}
          disabled={disabled}
          // Only the next empty box (or a filled one) can be focused by tapping.
          onFocus={(e) => {
            if (pendingFocus.current === null && i > value.length) focusBox(value.length);
            else e.target.select();
          }}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`h-[54px] w-[54px] rounded-[10px] border bg-white text-center font-inter text-[24px] font-semibold text-brand-ink shadow-[0_2px_8px_rgba(0,0,0,0.06)] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60 ${
            invalid ? "border-danger" : "border-[#d9d4e3]"
          }`}
        />
      ))}
    </div>
  );
});

export default OtpInput;
