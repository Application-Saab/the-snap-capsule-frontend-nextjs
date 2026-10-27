import Image from "next/image";
import { SMART_FEATURES } from "./data";
import { Section, SectionHeading } from "./shared";
import "./SmartFeatures.css";

export default function SmartFeatures() {
  return (
    <Section id="features">
      <div className="smart-features">
        <SectionHeading
          title="Smart Features For Your Memories"
          subtitle="Secure, organize & share every event memory — all in one place"
        />
        <ul className="smart-features__list">
          {SMART_FEATURES.map((f) => (
            <li key={f.title} className="smart-features__item">
              <div className="smart-features__media">
                <Image
                  src={f.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 250px, 33vw"
                  className="smart-features__img"
                />
              </div>
              <h3 className="smart-features__title">{f.title}</h3>
              <p className="smart-features__text">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}