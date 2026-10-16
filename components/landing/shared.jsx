import Link from "next/link";
import { ArrowRight } from "./icons";

export function Section({ id, className = "", inner = "", children }) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <div className={`mx-auto w-full max-w-[780px] ${inner}`}>{children}</div>
    </section>
  );
}

export function SectionHeading({ title, subtitle, subtitleClass = "", className = "" }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <h2 className="font-poppins text-[20px] font-bold leading-[1.2] text-brand-ink">{title}</h2>
      {subtitle ? (
        <p
          className={`mt-[6px] max-w-[300px] font-inter text-[13px] font-medium text-body ${subtitleClass}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function PrimaryButton({ href = "#", children, className = "", icon = <ArrowRight /> }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-[6px] bg-brand font-inter font-semibold text-white transition hover:bg-[#82467a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      <span>{children}</span>
      {icon}
    </Link>
  );
}

export function ViewAllDetails({ href = "#how-it-works", className = "" }) {
  return (
    <div className={`flex flex-col items-center gap-[5px] px-[8px] text-center font-inter text-[12px] font-medium ${className}`}>
      <p className="leading-[13px] text-black/80 min-[380px]:whitespace-nowrap">
        Event Capsule makes it easy to keep all your special moments ...
      </p>
      <Link href={href} className="leading-[13px] text-brand hover:underline">
        View All Details →
      </Link>
    </div>
  );
}
