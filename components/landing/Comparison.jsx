import Image from "next/image";
import { CAPSULE_WAY, IMAGES, OLD_WAY } from "./data";
import { CheckBadge, CrossBadge } from "./icons";
import { Section, SectionHeading } from "./shared";

function ComparisonCard({ tone, title, tagline, image, items }) {
  const old = tone === "old";
  return (
    <div
      className={`rounded-[16px] border-2 px-[6px] py-4 md:px-6 md:py-6 ${
        old ? "border-[#f9bdbf] bg-[#fef4f6]" : "border-[#ded5f5] bg-[#f7f2fe]"
      }`}
    >
      <div className={`flex items-center gap-2 border-b pb-[6px] ${old ? "border-[#f3c9cb]" : "border-[#ddd4f3]"}`}>
        <Image src={image} alt="" width={57} height={60} className="h-[60px] w-[57px] shrink-0" />
        <div className="font-inter font-medium">
          <h3 className="text-[22.6px] leading-tight text-black">{title}</h3>
          <p className="text-[14.5px] text-black/50">{tagline}</p>
        </div>
      </div>
      <ul className="mt-[18px] flex flex-col">
        {items.map(([lead, rest], i) => (
          <li
            key={lead}
            className={`flex items-center gap-[10px] py-[5px] ${i ? `border-t ${old ? "border-[#f3dfe0]" : "border-[#e4dcf5]"}` : ""}`}
          >
            {old ? <CrossBadge /> : <CheckBadge />}
            <p className="font-inter text-[15.5px] font-medium leading-[1.25] text-black/70">
              <span className={`font-semibold ${old ? "text-danger" : "text-royal"}`}>{lead}</span> — {rest}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Comparison() {
  return (
    <Section inner="px-[9px] pt-[14px] md:px-6 md:pt-20">
      <SectionHeading
        title="Your Memories Deserve Better."
        subtitle="From scattered photos to one beautifully organized memory space."
      />
      <div className="mt-[9px] flex flex-col gap-3 md:mt-10 md:grid md:grid-cols-2 md:gap-6">
        <ComparisonCard
          tone="old"
          title="THE OLD WAY"
          tagline="Scattered. Risky. Hard to Manage."
          image={IMAGES.oldWayFolder}
          items={OLD_WAY}
        />
        <ComparisonCard
          tone="capsule"
          title="EVENT CAPSULE"
          tagline="Organized, Secure, Effortless."
          image={IMAGES.capsuleFolder}
          items={CAPSULE_WAY}
        />
      </div>
    </Section>
  );
}
