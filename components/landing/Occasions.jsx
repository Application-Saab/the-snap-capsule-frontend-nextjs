import Image from "next/image";
import { OCCASIONS } from "./data";
import { ImagePlaceholder } from "./icons";
import { Section } from "./shared";

export default function Occasions() {
  return (
    <Section inner="pt-[16px] md:px-6 md:pt-20">
      <div className="px-4 text-center">
        <h2 className="font-poppins text-[20px] font-semibold leading-[1.2] text-black md:text-[32px]">
          Perfect For Every Occasion
        </h2>
        <p className="mx-auto mt-[5px] max-w-[270px] font-inter text-[11px] text-[#8a8a8a] md:mt-3 md:max-w-xl md:text-base">
          No matter the event, your memories stay safe, organized and easy to relive
        </p>
      </div>
      <ul className="rail mt-[7px] flex gap-[2px] overflow-x-auto px-[7px] md:mt-10 md:justify-center md:gap-8 md:overflow-visible">
        {OCCASIONS.map((o) => (
          <li key={o.label} className="flex w-[80px] shrink-0 flex-col items-center gap-[9px] md:w-32">
            {o.image ? (
              <Image
                src={o.image}
                alt={o.label}
                width={70}
                height={70}
                className="h-[70px] w-[70px] rounded-full object-cover md:h-28 md:w-28"
              />
            ) : (
              <ImagePlaceholder label="Image pending" className="h-[70px] w-[70px] rounded-full md:h-28 md:w-28" />
            )}
            <span className="text-center font-poppins text-[12.5px] font-medium leading-[1.1] text-brand md:text-base">
              {o.label}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
