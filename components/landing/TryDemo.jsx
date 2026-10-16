import Image from "next/image";
import { DEMO_PERKS, IMAGES } from "./data";
import { PerkIcon } from "./icons";
import { PrimaryButton, ViewAllDetails } from "./shared";

function Perk({ icon, title, text }) {
  return (
    <div className="flex w-[124px] items-start gap-[6px] md:w-60 md:gap-3">
      <PerkIcon name={icon} />
      <div className="font-inter">
        <p className="text-[9px] font-semibold leading-[11px] text-black/60 md:text-base md:leading-snug">{title}</p>
        <p className="mt-[2px] text-[7px] leading-[9px] text-[#676fa4] md:text-sm md:leading-snug">{text}</p>
      </div>
    </div>
  );
}

// On phones the perks float around the device exactly like the design
// (absolute positions in a 392px stage). From md up they become two columns
// either side of the phone.
export default function TryDemo() {
  const left = DEMO_PERKS.filter((p) => p.side === "left");
  const right = DEMO_PERKS.filter((p) => p.side === "right");
  return (
    <section id="demo" className="scroll-mt-20 bg-[#efeafc]/20 py-[19px] md:py-20">
      <div className="mx-auto w-full max-w-5xl px-3 text-center md:px-6">
        <h2 className="font-inter text-[20px] font-extrabold leading-[24px] text-brand-ink md:text-[32px] md:leading-tight">
          Try Before You Commit
        </h2>
        <p className="mx-auto mt-[2px] max-w-[352px] font-inter text-[12px] font-light text-black md:mt-3 md:max-w-xl md:text-base">
          Explore our platform with a free demo and experience how easy and powerful it is to use.
        </p>
      </div>

      {/* Mobile stage */}
      <div className="relative mx-auto mt-0 h-[352px] w-[392px] max-w-full md:hidden">
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

      {/* Tablet / desktop layout */}
      <div className="mx-auto mt-10 hidden max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-10 px-6 md:grid">
        <div className="flex flex-col items-end gap-10 text-left">
          {left.map((p) => (
            <Perk key={p.title} {...p} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4">
          <Image src={IMAGES.appPhone} alt="Event Capsule app preview" width={300} height={415} className="h-[415px] w-[300px]" />
          <PrimaryButton href="#plans" className="h-12 w-[300px] text-base">
            Try Free Demo
          </PrimaryButton>
        </div>
        <div className="flex flex-col items-start gap-10 text-left">
          {right.map((p) => (
            <Perk key={p.title} {...p} />
          ))}
        </div>
      </div>

      <ViewAllDetails className="mt-[12px] md:mt-12" />
    </section>
  );
}
