import Image from "next/image";
import { GUEST_STEPS } from "./data";
import { ImagePlaceholder } from "./icons";
import { Section, ViewAllDetails } from "./shared";

export default function GuestJoin() {
  return (
    <Section className="mt-[9px] bg-[#f9f7fd] md:mt-20" inner="pb-[8px] pt-[17px] md:px-6 md:py-16">
      <div className="flex flex-col items-center px-[15px] text-center">
        <h2 className="font-poppins text-[20px] font-bold leading-[1.2] text-brand-ink md:text-[32px]">
          How Your Guest Can Join
        </h2>
        <p className="mt-[6px] font-inter text-[11px] font-light text-subtle md:mt-3 md:text-base">
          It’s simple! Invite your guests, and let them create, share and be a part of your special moments.
        </p>
      </div>

      <ol className="rail mt-[16px] flex gap-[9px] overflow-x-auto px-[9px] pb-[8px] md:mt-10 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible">
        {GUEST_STEPS.map((s) => (
          <li
            key={s.title}
            className="flex h-[172px] w-[134px] shrink-0 flex-col items-center rounded-[9px] border-[1.5px] border-brand/20 bg-white px-[6px] pt-[6px] shadow-card md:h-auto md:w-auto md:pb-4"
          >
            {s.image ? (
              <Image src={s.image} alt="" width={114} height={81} className="h-[81px] w-[114px] object-contain" />
            ) : (
              <ImagePlaceholder label="Image pending" className="h-[81px] w-[114px] rounded-md" />
            )}
            <h3 className="mt-[8px] whitespace-nowrap text-center font-inter text-[12.4px] font-semibold leading-[15px] text-black">{s.title}</h3>
            <p className="mt-[3px] text-center font-inter text-[11px] leading-[14px] text-muted">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-[8px] flex justify-center gap-[2px] md:hidden" aria-hidden>
        <span className="h-[6px] w-[6px] rounded-full bg-brand" />
        {[5.5, 5, 4.5, 4].map((d) => (
          <span key={d} className="rounded-full bg-[#c9c3d3]" style={{ width: d, height: d, marginTop: (6 - d) / 2 }} />
        ))}
      </div>

      <ViewAllDetails className="mt-[8px] md:mt-10" />
    </Section>
  );
}
