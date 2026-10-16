import Image from "next/image";
import { IMAGES } from "./data";
import { PrimaryButton, Section } from "./shared";

export default function CreateCapsuleCta() {
  return (
    <Section inner="flex items-center gap-[4px] pr-3 pt-[5px] sm:justify-center sm:gap-6 sm:pt-6">
      <Image
        src={IMAGES.createCapsuleBox}
        alt=""
        width={116}
        height={146}
        className="h-[146px] w-[116px] shrink-0"
      />
      <div className="flex min-w-0 max-w-[400px] flex-col">
        <h2 className="font-poppins text-[20px] font-bold leading-[1.2] text-brand-ink">Create Event Capsule</h2>
        <p className="mt-[6px] font-inter text-[12px] font-medium text-subtle">
          Build your Event Capsule from the ground up. Add details, photos, settings and make it truly yours.
        </p>
        <PrimaryButton href="#plans" className="mt-[10px] h-[32px] w-full max-w-[240px] text-[14px]">
          Create Now
        </PrimaryButton>
      </div>
    </Section>
  );
}
