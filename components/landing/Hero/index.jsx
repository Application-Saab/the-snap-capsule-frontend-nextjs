import Image from "next/image";
import { IMAGES } from "../data";
import { ChevronRight, Stars } from "../icons";
import { PrimaryButton, Section } from "../shared";
import { AVATARS } from "../data";
import "./Hero.css";



export default function Hero() {
  return (
    <Section>
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-first">Every Memory.</span>
            <br />
            Deserve one Private <span className="hero__title-accent">Capsule</span>
          </h1>
          <p className="hero__text">
            Create one beautiful space where guests can view and share all your celebration photos.
          </p>

          <div className="hero__rating">
            <div className="hero__avatars" aria-hidden="true">
              {AVATARS.map((a) => (
                <span
                  key={a.initials}
                  className="hero__avatar"
                  style={{ backgroundColor: a.color }}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <div className="hero__rating-body">
              <span className="hero__rating-label">Love by 10,000+ Hosts</span>
              <span className="hero__rating-stars">
                <Stars size={11} />
                <span className="hero__rating-score">4.9/5</span>
              </span>
            </div>
          </div>

          <PrimaryButton href="#plans" icon={<ChevronRight />} className="hero__cta">
            Create Capsule
          </PrimaryButton>
        </div>

        <Image
          src={IMAGES.appPhone}
          alt="Event Capsule app showing a family photo gallery"
          width={164}
          height={227}
          priority
          className="hero__phone"
        />
      </div>
    </Section>
  );
}