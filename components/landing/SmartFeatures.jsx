import Image from "next/image";
import { SMART_FEATURES } from "./data";
import { Section, SectionHeading } from "./shared";

export default function SmartFeatures() {
  return (
    <Section id="features" inner="px-[6px] pt-[13px] md:px-6 md:pt-16">
      <SectionHeading
        title="Smart Features For Your Memories"
        subtitle="Secure, organize & share every event memory — all in one place"
      />
      <ul className="mt-[10px] grid grid-cols-3 gap-x-2 gap-y-[13.5px] md:mt-10 md:gap-6">
        {SMART_FEATURES.map((f) => (
          <li
            key={f.title}
            className="flex h-[168px] flex-col items-center overflow-hidden rounded-[8px] border-x border-b border-black/10 bg-white shadow-card md:h-auto md:pb-6"
          >
            <div className="relative h-[94px] w-full overflow-hidden rounded-b-[13.5px] rounded-t-[8px] md:h-auto md:aspect-[121/94]">
              <Image src={f.image} alt="" fill sizes="(min-width: 768px) 320px, 122px" className="object-cover" />
            </div>
            <h3 className="mt-[7px] w-full whitespace-nowrap text-center font-inter text-[12px] font-bold leading-[13.5px] tracking-[-0.2px] text-black md:mt-4 md:text-lg">
              {f.title}
            </h3>
            <p className="mt-[7px] max-w-[109px] text-center font-inter text-[12px] font-medium leading-[13.9px] text-muted md:mt-2 md:max-w-none md:text-sm">
              {f.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
