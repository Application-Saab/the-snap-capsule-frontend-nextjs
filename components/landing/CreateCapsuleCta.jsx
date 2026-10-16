import Image from "next/image";
import { IMAGES } from "./data";
import { PrimaryButton, Section } from "./shared";

export default function CreateCapsuleCta() {
  return (
    <Section inner="flex items-center gap-[4px] pr-3 pt-[5px] md:justify-center md:gap-10 md:px-6 md:pt-20">
      <Image
        src={IMAGES.createCapsuleBox}
        alt=""
        width={116}
        height={146}
        className="h-[146px] w-[116px] shrink-0 md:h-56 md:w-44"
      />
      <div className="flex min-w-0 flex-col">
        <h2 className="font-poppins text-[20px] font-bold leading-[1.2] text-brand-ink md:text-[32px]">Create Event Capsule</h2>
        <p className="mt-[6px] font-inter text-[12px] font-medium text-subtle md:mt-3 md:max-w-md md:text-base">
          Build your Event Capsule from the ground up. Add details, photos, settings and make it truly yours.
        </p>
        <PrimaryButton href="#plans" className="mt-[10px] h-[32px] w-full max-w-[240px] text-[14px] md:mt-5 md:h-12 md:text-base">
          Create Now
        </PrimaryButton>
      </div>
    </Section>
  );
}
