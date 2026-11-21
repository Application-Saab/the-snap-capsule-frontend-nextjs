import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "../lib/locale";
import { LANGUAGE_GROUPS, LANGUAGES, flagSrc } from "../lib/translate";

// Language / region dropdown with flags, grouped by region (Asia, USA, Europe,
// Saudi Arabia). Picking an entry translates the page and switches prices and
// dates (see lib/translate.js and lib/locale.js). A custom list is used
// because a native <select> can't show flag images.
// The whole control is "notranslate" so language names stay as written.
export default function LanguageSwitcher({ className = "" }) {
  const { language, setLanguage } = useLocale();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0); // keyboard-highlighted option
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const buttonRef = useRef(null);
  const listId = useId();

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  // On open, highlight the current choice and move focus into the list.
  useEffect(() => {
    if (!open) return;
    setActive(Math.max(0, LANGUAGES.findIndex((l) => l.id === language.id)));
    if (listRef.current) listRef.current.focus();
  }, [open, language.id]);

  // Keep the highlighted option scrolled into view.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-index="${active}"]`);
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function choose(id) {
    setOpen(false);
    if (buttonRef.current) buttonRef.current.focus();
    if (id !== language.id) setLanguage(id);
  }

  function onListKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, LANGUAGES.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(LANGUAGES.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(LANGUAGES[active].id);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Escape" && buttonRef.current) buttonRef.current.focus();
    }
  }

  return (
    <div ref={rootRef} className={`notranslate relative ${className}`} translate="no">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Language and region: ${language.label} (${language.region})`}
        className="flex h-9 max-w-[150px] items-center gap-1.5 rounded-full border border-brand/30 bg-white pl-2 pr-2 font-inter text-[13px] font-medium text-brand-ink outline-none transition hover:border-brand focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 sm:max-w-[230px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={flagSrc(language)} alt="" width={20} height={14} className="h-[14px] w-5 shrink-0 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
        <span className="truncate">{language.label}</span>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label="Language and region"
          aria-activedescendant={`${listId}-${active}`}
          onKeyDown={onListKeyDown}
          className="absolute end-0 top-11 z-40 max-h-[70vh] w-60 overflow-y-auto rounded-xl border border-black/5 bg-white py-1 shadow-lg outline-none"
        >
          {LANGUAGE_GROUPS.map((group) => (
            <li key={group.region} role="presentation">
              <p className="px-3 pb-1 pt-2 font-inter text-[11px] font-semibold uppercase tracking-wide text-black/40" aria-hidden>
                {group.region}
              </p>
              <ul role="group" aria-label={group.region}>
                {group.languages.map((lang) => {
                  const index = LANGUAGES.indexOf(lang);
                  const selected = lang.id === language.id;
                  return (
                    <li
                      key={lang.id}
                      id={`${listId}-${index}`}
                      data-index={index}
                      role="option"
                      aria-selected={selected}
                      lang={lang.translate || "en"}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => choose(lang.id)}
                      className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 font-inter text-[14px] text-brand-ink ${
                        index === active ? "bg-brand/10" : ""
                      } ${selected ? "font-semibold" : ""}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={flagSrc(lang)} alt="" width={20} height={14} className="h-[14px] w-5 shrink-0 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
                      <span className="flex-1">{lang.label}</span>
                      <span className="font-inter text-[11px] text-black/40">{lang.currency}</span>
                      {selected ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                          <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
