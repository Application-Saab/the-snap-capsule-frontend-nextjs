import Image from "next/image";
import { OCCASIONS } from "./data";
import { ImagePlaceholder } from "./icons";
import { Section } from "./shared";

export default function Occasions() {
  return (
    <Section inner="pt-[16px]">
      <div className="px-4 text-center">
        <h2 className="font-poppins text-[20px] font-semibold leading-[1.2] text-black">
          Perfect For Every Occasion
        </h2>
        <p className="mx-auto mt-[5px] max-w-[270px] font-inter text-[11px] text-[#8a8a8a]">
          No matter the event, your memories stay safe, organized and easy to relive
        </p>
      </div>
      <ul className="rail mt-[7px] flex gap-[2px] overflow-x-auto px-[7px] sm:gap-4 [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto">
        {OCCASIONS.map((o) => (
          <li key={o.label} className="flex w-[80px] shrink-0 flex-col items-center gap-[9px]">
            {o.image ? (
              <Image
                src={o.image}
                alt={o.label}
                width={70}
                height={70}
                className="h-[70px] w-[70px] rounded-full object-cover"
              />
            ) : (
              <ImagePlaceholder label="Image pending" className="h-[70px] w-[70px] rounded-full" />
            )}
            <span className="text-center font-poppins text-[12.5px] font-medium leading-[1.1] text-brand">
              {o.label}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
