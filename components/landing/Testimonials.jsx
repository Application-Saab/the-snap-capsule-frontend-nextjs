import Image from "next/image";
import { TESTIMONIALS } from "./data";
import { ImagePlaceholder, QuoteMark, Stars } from "./icons";
import { Section } from "./shared";

export default function Testimonials() {
  return (
    <Section inner="pt-[13px]">
      <h2 className="text-center font-roboto text-[18px] font-semibold italic text-black/70">
        What Our Customers Say
      </h2>
      <ul className="rail mt-[8px] flex gap-[6px] overflow-x-auto px-[4px] [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto">
        {TESTIMONIALS.map((t, i) => (
          <li
            key={i}
            className="flex min-h-[290px] w-[171px] shrink-0 flex-col overflow-hidden rounded-[6px] border border-black/25 bg-white"
          >
            {t.image ? (
              <Image
                src={t.image}
                alt={`Photo of ${t.name}`}
                width={171}
                height={187}
                className="h-[187px] w-full object-cover"
              />
            ) : (
              <ImagePlaceholder label="Photo pending" className="h-[187px] w-full" />
            )}
            <figure className="flex flex-1 flex-col px-[7px] pt-[10px]">
              <blockquote className="relative pl-[14px] pr-[4px] font-inter text-[10px] leading-[12.5px] text-[#555]">
                <QuoteMark className="absolute left-0 top-0 text-[#666]" />
                {t.quote}
                <QuoteMark flip className="absolute -bottom-[6px] right-0 text-[#666]" />
              </blockquote>
              <figcaption className="mt-auto flex items-center justify-between pb-[8px] pt-[10px] font-inter text-[10px] text-[#555]">
                {t.name}
                <Stars size={11} className="text-brand" />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
