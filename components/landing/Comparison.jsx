import Image from "next/image";
import { CAPSULE_WAY, IMAGES, OLD_WAY } from "./data";
import { CheckBadge, CrossBadge } from "./icons";
import { Section, SectionHeading } from "./shared";
import "./Comparison.css";

function ComparisonCard({ tone, title, tagline, image, items }) {
  const old = tone === "old";
  return (
    <div
      className={`comparison-card ${
        old ? "comparison-card--old" : "comparison-card--capsule"
      }`}
    >
      <div className="comparison-card__head">
        <Image
          src={image}
          alt=""
          width={57}
          height={60}
          className="comparison-card__image"
        />
        <div className="comparison-card__heading">
          <h3 className="comparison-card__title">{title}</h3>
          <p className="comparison-card__tagline">{tagline}</p>
        </div>
      </div>
      <ul className="comparison-card__list">
        {items.map(([lead, rest]) => (
          <li key={lead} className="comparison-card__item">
            {old ? <CrossBadge /> : <CheckBadge />}
            <p className="comparison-card__text">
              <span className="comparison-card__lead">{lead}</span> — {rest}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Comparison() {
  return (
    <Section>
      <div className="comparison">
        <SectionHeading
          title="Your Memories Deserve Better."
          subtitle="From scattered photos to one beautifully organized memory space."
        />
        <div className="comparison__cards">
          <ComparisonCard
            tone="old"
            title="THE OLD WAY"
            tagline="Scattered. Risky. Hard to Manage."
            image={IMAGES.oldWayFolder}
            items={OLD_WAY}
          />
          <ComparisonCard
            tone="capsule"
            title="EVENT CAPSULE"
            tagline="Organized, Secure, Effortless."
            image={IMAGES.capsuleFolder}
            items={CAPSULE_WAY}
          />
        </div>
      </div>
    </Section>
  );
}