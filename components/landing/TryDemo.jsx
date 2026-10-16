import Image from "next/image";
import { DEMO_PERKS, IMAGES } from "./data";
import { PerkIcon } from "./icons";
import { PrimaryButton, ViewAllDetails } from "./shared";

function Perk({ icon, title, text }) {
  return (
    <div className="flex w-[124px] items-start gap-[6px]">
      <PerkIcon name={icon} />
      <div className="font-inter">
        <p className="text-[9px] font-semibold leading-[11px] text-black/60">{title}</p>
        <p className="mt-[2px] text-[7px] leading-[9px] text-[#676fa4]">{text}</p>
      </div>
    </div>
  );
}

// The perks float around the device exactly like the design: absolute
// positions in a 392px stage, centred on wider screens.
export default function TryDemo() {
  return (
    <section id="demo" className="scroll-mt-20 bg-[#efeafc]/20 py-[19px]">
      <div className="mx-auto w-full max-w-[780px] px-3 text-center">
        <h2 className="font-inter text-[20px] font-extrabold leading-[24px] text-brand-ink">
          Try Before You Commit
        </h2>
        <p className="mx-auto mt-[2px] max-w-[352px] font-inter text-[12px] font-light text-black">
          Explore our platform with a free demo and experience how easy and powerful it is to use.
        </p>
      </div>

      {/* Stage */}
      <div className="relative mx-auto mt-0 h-[352px] w-[392px] max-w-full">
        <Image
          src={IMAGES.appPhone}
          alt="Event Capsule app preview"
          width={220}
          height={304}
          className="absolute left-[100px] top-[10px] h-[304px] w-[220px]"
        />
        {DEMO_PERKS.map((p) => (
          <div
            key={p.title}
            className="absolute"
            style={{ top: p.top - 49, left: p.side === "left" ? 13 : 268 }}
          >
            <Perk {...p} />
          </div>
        ))}
        <PrimaryButton
          href="#plans"
          className="absolute bottom-0 left-[100px] h-[33px] w-[220px] text-[14px]"
        >
          Try Free Demo
        </PrimaryButton>
      </div>


      <ViewAllDetails className="mt-[12px]" />
    </section>
  );
}
