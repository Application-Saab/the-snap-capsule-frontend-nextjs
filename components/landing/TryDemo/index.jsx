import Image from "next/image";
import { DEMO_PERKS, IMAGES } from "../data";
import { PerkIcon } from "../icons";
import { PrimaryButton, ViewAllDetails } from "../shared";
import "./TryDemo.css";

function Perk({ icon, title, text }) {
  return (
    <div className="try-demo-perk">
      <PerkIcon name={icon} />
      <div className="try-demo-perk__body">
        <p className="try-demo-perk__title">{title}</p>
        <p className="try-demo-perk__text">{text}</p>
      </div>
    </div>
  );
}

// The perks float around the device exactly like the design: absolute
// positions in a 392px stage, centred on wider screens.
export default function TryDemo() {
  return (
    <section id="demo" className="try-demo">
      <div className="try-demo__head">
        <h2 className="try-demo__title">Try Before You Commit</h2>
        <p className="try-demo__subtitle">
          Explore our platform with a free demo and experience how easy and powerful it is to use.
        </p>
      </div>

      {/* Stage */}
      <div className="try-demo__stage">
        <Image
          src={IMAGES.appPhone}
          alt="Event Capsule app preview"
          width={220}
          height={304}
          className="try-demo__phone"
        />
        {DEMO_PERKS.map((p) => (
          <div
            key={p.title}
            className={`try-demo__perk-slot ${
              p.side === "left"
                ? "try-demo__perk-slot--left"
                : "try-demo__perk-slot--right"
            }`}
            style={{ top: p.top - 49 }}
          >
            <Perk {...p} />
          </div>
        ))}
        <PrimaryButton href="#plans" className="try-demo__cta">
          Try Free Demo
        </PrimaryButton>
      </div>

      <ViewAllDetails className="try-demo__view-all" />
    </section>
  );
}