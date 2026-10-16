import Image from "next/image";
import { TESTIMONIALS } from "./data";
import { ImagePlaceholder, QuoteMark, Stars } from "./icons";
import { Section } from "./shared";

export default function Testimonials() {
  return (
    <Section inner="pt-[13px] md:px-6 md:pt-20">
      <h2 className="text-center font-roboto text-[18px] font-semibold italic text-black/70 md:text-[28px]">
        What Our Customers Say
      </h2>
      <ul className="rail mt-[8px] flex gap-[6px] overflow-x-auto px-[4px] md:mt-10 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
        {TESTIMONIALS.map((t, i) => (
          <li
            key={i}
            className="flex min-h-[290px] w-[171px] shrink-0 flex-col overflow-hidden rounded-[6px] border border-black/25 bg-white md:h-auto md:w-auto"
          >
            {t.image ? (
              <Image
                src={t.image}
                alt={`Photo of ${t.name}`}
                width={171}
                height={187}
                className="h-[187px] w-full object-cover md:h-72"
              />
            ) : (
              <ImagePlaceholder label="Photo pending" className="h-[187px] w-full md:h-72" />
            )}
            <figure className="flex flex-1 flex-col px-[7px] pt-[10px] md:px-4 md:pt-4">
              <blockquote className="relative pl-[14px] pr-[4px] font-inter text-[10px] leading-[12.5px] text-[#555] md:text-sm md:leading-5">
                <QuoteMark className="absolute left-0 top-0 text-[#666]" />
                {t.quote}
                <QuoteMark flip className="absolute -bottom-[6px] right-0 text-[#666]" />
              </blockquote>
              <figcaption className="mt-auto flex items-center justify-between pb-[8px] pt-[10px] font-inter text-[10px] text-[#555] md:pb-4 md:text-sm">
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
