import Image from "next/image";
import { SMART_FEATURES } from "./data";
import { Section, SectionHeading } from "./shared";

export default function SmartFeatures() {
  return (
    <Section id="features" inner="px-[6px] pt-[13px]">
      <SectionHeading
        title="Smart Features For Your Memories"
        subtitle="Secure, organize & share every event memory — all in one place"
      />
      <ul className="mt-[10px] grid grid-cols-3 gap-x-2 gap-y-[13.5px]">
        {SMART_FEATURES.map((f) => (
          <li
            key={f.title}
            className="flex min-h-[168px] flex-col pb-[10px] items-center overflow-hidden rounded-[8px] border-x border-b border-black/10 bg-white shadow-card"
          >
            <div className="relative aspect-[121/94] w-full overflow-hidden rounded-b-[13.5px] rounded-t-[8px]">
              <Image src={f.image} alt="" fill sizes="(min-width: 640px) 250px, 33vw" className="object-cover" />
            </div>
            <h3 className="mt-[7px] w-full whitespace-nowrap text-center font-inter text-[12px] font-bold leading-[13.5px] tracking-[-0.2px] text-black">
              {f.title}
            </h3>
            <p className="mt-[7px] max-w-[150px] px-1 text-center font-inter text-[12px] font-medium leading-[13.9px] text-muted">
              {f.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
