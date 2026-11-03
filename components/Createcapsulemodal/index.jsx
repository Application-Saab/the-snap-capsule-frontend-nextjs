import { useEffect, useState } from "react";
import "./CreateCapsuleModal.css";
import Image from "next/image";
import eventname from "../../assets/eventname.svg";
import eventdate from "../../assets/eventdate.svg"
import secure from "../../assets/secure.svg"
export default function CreateCapsuleModal({
  isOpen,
  onClose,
  onSubmit,
  illustrationSrc, 
}) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [dateFocused, setDateFocused] = useState(false);
  const [errors, setErrors] = useState({});

  // Close on Escape + lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!eventName.trim()) next.eventName = "Please enter an event name";
    if (!eventDate) next.eventDate = "Please choose an event date";
    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit?.({ eventName: eventName.trim(), eventDate });
    setEventName("");
    setEventDate("");
  };

  return (
    <div className="capsule-overlay" onMouseDown={onClose} role="presentation">
      <div
        className="capsule-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="capsule-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="capsule-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="capsule-illustration">
           <Image src={illustrationSrc} alt="" width={200} height={200} />
        </div>

        <h2 id="capsule-title" className="capsule-title">
          Let’s Create Your <span className="capsule-title-accent">Capsule</span>
        </h2>
        <p className="capsule-subtitle">
          Tell us about your event and keep every memory together.
        </p>

        <form className="capsule-form" onSubmit={handleSubmit} noValidate>
          <div className="capsule-row">
            <span className="capsule-icon-box">
              <Image
                src={eventname}
                alt="Event Name"
                width={22}
                height={22}
              />
            </span>
            <div className="capsule-field">
              <input
                type="text"
                className={`capsule-input ${errors.eventName ? "has-error" : ""}`}
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                aria-label="Event name"
              />
              {errors.eventName && <span className="capsule-error">{errors.eventName}</span>}
            </div>
          </div>

          <div className="capsule-row">
            <span className="capsule-icon-box">
              <Image
                src={eventdate}
                alt="Event Name"
                width={22}
                height={22}
              />
            </span>
            <div className="capsule-field">
              <input
                type={dateFocused || eventDate ? "date" : "text"}
                className={`capsule-input ${errors.eventDate ? "has-error" : ""}`}
                placeholder="Event Date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                onFocus={() => setDateFocused(true)}
                onBlur={() => setDateFocused(false)}
                aria-label="Event date"
              />
              {errors.eventDate && <span className="capsule-error">{errors.eventDate}</span>}
            </div>
          </div>

          <button type="submit" className="capsule-button">
            Create Event Capsule <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="capsule-tagline">Let’s make your memories timeless!</p>

        <div className="capsule-safe">
          <span className="capsule-icon-box">
            <Image
              src={secure}
              alt="Event Name"
              width={22}
              height={22}
            />
          </span>
          <div className="capsule-safe-text">
            <strong>Your memories are safe with us.</strong>
            <span>Only You and your guests can access your capsule.</span>
          </div>
        </div>
      </div>
    </div>
  );
}