import Image from "next/image";
import { HOW_IT_WORKS } from "./data";
import { Section, ViewAllDetails } from "./shared";
import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <div className="how-it-works">
        <div className="how-it-works__head">
          <h2 className="how-it-works__title">How It Works</h2>
          <p className="how-it-works__subtitle">
            See how easy it is to create, share &amp; relive your memories.
          </p>
        </div>
        <ol className="how-it-works__list">
          {HOW_IT_WORKS.map((s) => (
            <li
              key={s.title}
              className="how-it-works__step"
              style={{ backgroundColor: s.bg }}
            >
              <Image
                src={s.image}
                alt=""
                width={103}
                height={86}
                className="how-it-works__image"
              />
              <h3 className="how-it-works__step-title">{s.title}</h3>
              <p className="how-it-works__step-text">{s.text}</p>
              <span className="how-it-works__bar" aria-hidden />
            </li>
          ))}
        </ol>
        <ViewAllDetails className="how-it-works__view-all" />
      </div>
    </Section>
  );
}