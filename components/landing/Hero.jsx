import Image from "next/image";
import { IMAGES } from "./data";
import { ChevronRight, Stars } from "./icons";
import { PrimaryButton, Section } from "./shared";

export default function Hero() {
  return (
    <Section inner="flex items-center justify-between gap-2 px-3 pt-[14px] sm:justify-center sm:gap-16 sm:pt-8">
      <div className="flex w-[208px] shrink-0 flex-col gap-[7px] sm:w-auto sm:max-w-[380px] sm:flex-1">
        <h1 className="font-poppins text-[22px] font-bold leading-[27px] text-brand-ink sm:text-[30px] sm:leading-[38px]">
          <span className="tracking-[1.5px]">Every Memory.</span>
          <br />
          Deserve one Private <span className="text-brand">Capsule</span>
        </h1>
        <p className="font-inter text-[12px] font-medium text-body sm:text-[14px]">
          Create one beautiful space where guests can view and share all your celebration photos.
        </p>

        <div className="mt-[2px] flex items-center gap-[4.5px]">
          <Image
            src={IMAGES.heroAvatars}
            alt=""
            width={80}
            height={23}
            className="h-[23px] w-[80px]"
          />
          <div className="flex flex-col gap-[2px] font-inter">
            <span className="text-[9.5px] font-semibold leading-none text-[#2b2b2b]">Love by 10,000+ Hosts</span>
            <span className="flex items-center gap-[3px] text-[#f5a623]">
              <Stars size={11} />
              <span className="text-[10px] font-semibold leading-none">4.9/5</span>
            </span>
          </div>
        </div>

        <PrimaryButton
          href="#plans"
          icon={<ChevronRight />}
          className="mt-[5px] h-[35px] w-[186px] gap-3 rounded-[7px] font-poppins text-[13.6px]"
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
        className="h-[227px] w-[164px] shrink-0 object-contain sm:h-[304px] sm:w-[220px]"
      />
    </Section>
  );
}
