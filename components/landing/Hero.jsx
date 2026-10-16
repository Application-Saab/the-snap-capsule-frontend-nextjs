import Image from "next/image";
import { IMAGES } from "./data";
import { ChevronRight, Stars } from "./icons";
import { PrimaryButton, Section } from "./shared";

export default function Hero() {
  return (
    <Section inner="flex items-center justify-between gap-2 px-3 pt-[14px] md:gap-12 md:px-6 md:py-16">
      <div className="flex w-[208px] shrink-0 flex-col gap-[7px] md:w-auto md:max-w-xl md:gap-5">
        <h1 className="font-poppins text-[22px] font-bold leading-[27px] text-brand-ink md:text-5xl md:leading-[1.15]">
          <span className="tracking-[1.5px]">Every Memory.</span>
          <br />
          Deserve one Private <span className="text-brand">Capsule</span>
        </h1>
        <p className="font-inter text-[12px] font-medium text-body md:text-lg">
          Create one beautiful space where guests can view and share all your celebration photos.
        </p>

        <div className="mt-[2px] flex items-center gap-[4.5px]">
          <Image
            src={IMAGES.heroAvatars}
            alt=""
            width={80}
            height={23}
            className="h-[23px] w-[80px] md:h-8 md:w-[111px]"
          />
          <div className="flex flex-col gap-[2px] font-inter">
            <span className="text-[9.5px] font-semibold leading-none text-[#2b2b2b] md:text-xs">Love by 10,000+ Hosts</span>
            <span className="flex items-center gap-[3px] text-[#f5a623]">
              <Stars size={11} />
              <span className="text-[10px] font-semibold leading-none md:text-xs">4.9/5</span>
            </span>
          </div>
        </div>

        <PrimaryButton
          href="#plans"
          icon={<ChevronRight />}
          className="mt-[5px] h-[35px] w-[186px] gap-3 rounded-[7px] font-poppins text-[13.6px] md:h-12 md:w-56 md:text-base"
        >
          Create Capsule
        </PrimaryButton>
      </div>

      <Image
        src={IMAGES.appPhone}
        alt="Event Capsule app showing a family photo gallery"
        width={164}
        height={227}
        priority
        className="h-[227px] w-[164px] shrink-0 object-contain md:h-[440px] md:w-[318px]"
      />
    </Section>
  );
}
