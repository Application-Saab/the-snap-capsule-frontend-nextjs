// Small inline icons used across the landing page. Kept as plain SVG so they
// inherit `currentColor` and stay crisp at any size.

const base = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" };

export function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 16" width="24" height="16" aria-hidden {...props}>
      <path d="M1.5 1.5h21M1.5 8h21M1.5 14.5h21" {...base} strokeWidth="2.4" />
    </svg>
  );
}

export function ChevronRight(props) {
  return (
    <svg viewBox="0 0 7 13" width="7" height="13" aria-hidden {...props}>
      <path d="M1 1l5 5.5L1 12" {...base} strokeWidth="1.8" />
    </svg>
  );
}

export function ArrowRight(props) {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden {...props}>
      <path d="M1 5h8M5.5 1.5L9 5 5.5 8.5" {...base} strokeWidth="1.6" />
    </svg>
  );
}

export function ChevronDown(props) {
  return (
    <svg viewBox="0 0 12 8" width="12" height="8" aria-hidden {...props}>
      <path d="M1 1.5l5 5 5-5" {...base} strokeWidth="1.8" />
    </svg>
  );
}

export function CrossBadge() {
  return (
    <span className="flex h-[42px] w-[39px] shrink-0 items-center justify-center rounded-[8px] bg-[#fde9ea] text-[#e0302a]">
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden>
        <path d="M3 3l14 14M17 3L3 17" {...base} strokeWidth="2.6" />
      </svg>
    </span>
  );
}

export function CheckBadge() {
  return (
    <span className="flex h-[41px] w-[38px] shrink-0 items-center justify-center rounded-[8px] bg-[#ece6fb] text-[#3d16a6]">
      <svg viewBox="0 0 22 18" width="22" height="18" aria-hidden>
        <path d="M2 9.5l6 6L20 2.5" {...base} strokeWidth="2.6" />
      </svg>
    </span>
  );
}

export function CheckCircle(props) {
  return (
    <svg viewBox="0 0 22 22" width="22" height="22" aria-hidden {...props}>
      <circle cx="11" cy="11" r="9.8" {...base} strokeWidth="1.8" />
      <path d="M6.5 11.3l3 3 6-6.3" {...base} strokeWidth="1.9" />
    </svg>
  );
}

export function Star(props) {
  return (
    <svg viewBox="0 0 20 20" width="12" height="12" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M10 1.6l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.5l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z"
      />
    </svg>
  );
}

export function Stars({ count = 5, className = "", size = 12 }) {
  return (
    <span className={`inline-flex gap-[1px] ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} width={size} height={size} />
      ))}
    </span>
  );
}

export function QuoteMark({ flip = false, className = "" }) {
  return (
    <svg
      viewBox="0 0 16 12"
      width="11"
      height="9"
      aria-hidden
      className={className}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        fill="currentColor"
        d="M0 12V7.2C0 3.4 2 .9 5.6 0l.8 1.6C4.4 2.4 3.4 3.9 3.3 5.9H6.4V12zm9.3 0V7.2c0-3.8 2-6.3 5.6-7.2l.8 1.6c-2 .8-3 2.3-3.1 4.3h3.1V12z"
      />
    </svg>
  );
}

export function PerkIcon({ name }) {
  const paths = {
    bolt: <path d="M9.5 1.5L3 9.5h5l-1 5 6.5-8h-5z" {...base} strokeWidth="1.4" />,
    shield: (
      <>
        <path d="M8 1.5l5.5 2v4.2c0 3.3-2.3 5.7-5.5 6.8-3.2-1.1-5.5-3.5-5.5-6.8V3.5z" {...base} strokeWidth="1.3" />
        <path d="M5.5 8l1.7 1.7L10.6 6.3" {...base} strokeWidth="1.3" />
      </>
    ),
    clock: (
      <>
        <circle cx="8" cy="8" r="6.3" {...base} strokeWidth="1.3" />
        <path d="M8 4.5V8l2.4 1.6" {...base} strokeWidth="1.3" />
      </>
    ),
    cursor: <path d="M3 2l9.5 4.2-4 1.3-1.4 4.2z" {...base} strokeWidth="1.3" />,
  };
  return (
    <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[4px] bg-brand/20 text-brand">
      <svg viewBox="0 0 16 16" className="h-[13px] w-[13px]" aria-hidden>
        {paths[name]}
      </svg>
    </span>
  );
}

export function FaqIcon(props) {
  return (
    <svg viewBox="0 0 23 28" width="23" height="28" aria-hidden {...props}>
      <path fill="currentColor" d="M11.5 0L23 4.3v8.4C23 20 18.1 25.5 11.5 28 4.9 25.5 0 20 0 12.7V4.3z" />
      <path
        fill="#fff"
        d="M11.5 7.2a5 5 0 0 0-5 5.1 5 5 0 0 0 7.2 4.5l2.2 2.2 1.5-1.5-2.1-2.1a5.1 5.1 0 0 0 1.2-3.1 5 5 0 0 0-5-5.1zm0 2.4a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4z"
      />
    </svg>
  );
}

export function ImagePlaceholder({ label, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center bg-[repeating-linear-gradient(135deg,#f4ecf3,#f4ecf3_8px,#fbf6fa_8px,#fbf6fa_16px)] text-center text-[10px] font-medium text-brand/70 ${className}`}
      role="img"
      aria-label={label}
    >
      {label}
    </div>
  );
}
