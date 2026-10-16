import { FAQS } from "./data";
import { ChevronDown, FaqIcon } from "./icons";
import { Section } from "./shared";

export default function Faq() {
  return (
    <Section id="faq" inner="px-[6px] pb-16 pt-[13px] md:max-w-3xl md:px-6 md:pt-20">
      <div className="flex items-center gap-[9px]">
        <FaqIcon className="text-brand" />
        <h2 className="font-inter text-[22px] font-semibold leading-[18px] text-brand">FAQ</h2>
      </div>
      <div className="mt-[20px] flex flex-col gap-[10.5px]">
        {FAQS.map((f) => (
          <details key={f.q} className="group rounded-[9px] border border-[#eaecf3] bg-white p-[11.6px] shadow-faq">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-inter text-[14px] font-medium leading-[21px] text-black">
              <span className="max-w-[284px] md:max-w-none">{f.q}</span>
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#f6ebf4] text-brand transition-transform group-open:rotate-180">
                <ChevronDown />
              </span>
            </summary>
            <p className="mt-2 pr-10 font-inter text-[13px] leading-5 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
