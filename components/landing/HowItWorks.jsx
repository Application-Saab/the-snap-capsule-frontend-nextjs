import Image from "next/image";
import { HOW_IT_WORKS } from "./data";
import { Section, ViewAllDetails } from "./shared";

export default function HowItWorks() {
  return (
    <Section id="how-it-works" inner="px-[5px] pt-[8px]">
      <div className="text-center">
        <h2 className="font-poppins text-[20px] font-bold leading-[1.2] text-brand-ink">How It Works</h2>
        <p className="mt-[6px] font-inter text-[11px] font-light text-subtle">
          See how easy it is to create, share &amp; relive your memories.
        </p>
      </div>
      <ol className="mt-[14px] grid grid-cols-3 gap-x-2 gap-y-[10px]">
        {HOW_IT_WORKS.map((s) => (
          <li
            key={s.title}
            className="flex h-[180px] flex-col items-center rounded-[8px] border border-brand/20 shadow-card"
            style={{ backgroundColor: s.bg }}
          >
            <Image src={s.image} alt="" width={103} height={86} className="h-[86px] w-[103px] object-contain" />
            <h3 className="mt-[7px] text-center font-inter text-[12.2px] font-semibold leading-[13.5px] text-black">
              {s.title}
            </h3>
            <p className="mt-[7px] h-[45px] max-w-[118px] text-center font-inter text-[11.5px] leading-[13px] text-muted">
              {s.text}
            </p>
            <span className="mt-[7px] h-[3px] w-[80px] rounded-full bg-brand" aria-hidden />
          </li>
        ))}
      </ol>
      <ViewAllDetails className="mt-[15px]" />
    </Section>
  );
}
