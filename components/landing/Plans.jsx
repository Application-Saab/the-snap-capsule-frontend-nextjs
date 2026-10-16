import { PLANS } from "./data";
import { CheckCircle } from "./icons";
import { PrimaryButton, Section, SectionHeading } from "./shared";

export default function Plans() {
  return (
    <Section id="plans" inner="pt-[17px]">
      <SectionHeading title="Choose Perfect Plan For Event" />
      <ul className="rail mt-[20px] flex gap-2 overflow-x-auto px-[9px] pb-2 sm:gap-4 [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto">
        {PLANS.map((p) => (
          <li
            key={p.variant}
            className="flex min-h-[275px] w-[250px] shrink-0 flex-col justify-center rounded-[10px] border border-brand bg-white px-[12px] py-[14px] shadow-plan"
          >
            <div className="font-inter font-semibold leading-[1.6] text-brand-deep">
              <h3 className="whitespace-nowrap text-[22px] capitalize">{p.name}</h3>
              <p className="-mt-[2px] text-[12px] uppercase">{p.variant}</p>
            </div>
            <ul className="mt-[4px] flex flex-col gap-[9px]">
              {p.features.map((f) => (
                <li key={f} className="flex items-end gap-[7px] font-inter text-[15px] text-black">
                  <CheckCircle className="shrink-0 text-[#2fae3a]" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-[15px] font-inter font-semibold text-brand-deep">
              <span className="text-[20px] font-medium">Price</span> <span className="text-[26px]">{p.price}</span>
            </p>
            <PrimaryButton
              href="#"
              icon={null}
              className="mt-[15px] h-[35px] w-full rounded-[7px] text-[14px] font-bold"
            >
              {p.cta}
            </PrimaryButton>
          </li>
        ))}
      </ul>
    </Section>
  );
}
