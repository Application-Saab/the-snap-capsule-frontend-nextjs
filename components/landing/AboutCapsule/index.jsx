import { ABOUT } from "../data";
import { Section } from "../shared";

// "What is Snap Capsule?": a short explanation of the product in plain
// language, for visitors and for search engines (event photo sharing,
// QR code photo sharing, face recognition, occasions). Copy is in data.js.
export default function AboutCapsule() {
  return (
    <Section id="about" inner="px-4 pb-4 pt-8">
      <p className="text-center font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-brand">
        What is Snap Capsule?
      </p>
      <h2 className="mx-auto mt-2 max-w-[560px] text-center font-poppins text-[20px] font-bold leading-[1.3] text-brand-ink sm:text-[24px]">
        {ABOUT.title}
      </h2>
      <div className="mx-auto mt-4 max-w-[640px] space-y-3 font-inter text-[14px] leading-[1.6] text-body">
        {ABOUT.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {ABOUT.points.map((point) => (
          <li key={point.title} className="flex gap-3 rounded-[12px] border border-[#eee6f3] bg-[#fbf8fd] p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand/10 text-brand">
              <PointIcon name={point.icon} />
            </span>
            <div>
              <h3 className="font-inter text-[15px] font-semibold leading-snug text-brand-ink">{point.title}</h3>
              <p className="mt-1 font-inter text-[13px] leading-[1.55] text-muted">{point.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Popular uses">
        {ABOUT.keywords.map((keyword) => (
          <li key={keyword} className="rounded-full bg-brand/10 px-3 py-1 font-inter text-[12px] font-medium text-brand">
            {keyword}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function PointIcon({ name }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    qr: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <path d="M14 14h2v2h-2zM18 18h2v2h-2zM18 14h2M14 18v2" />
      </>
    ),
    face: (
      <>
        <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
        <circle cx="12" cy="11" r="3" />
        <path d="M8 17c1-1.6 2.4-2.4 4-2.4s3 .8 4 2.4" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10.5" width="14" height="10" rx="2" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5z" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...common} aria-hidden>
      {paths[name]}
    </svg>
  );
}
