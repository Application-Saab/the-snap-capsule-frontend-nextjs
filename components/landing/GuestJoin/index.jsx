import Image from "next/image";
import { GUEST_STEPS } from "../data";
import { ImagePlaceholder } from "../icons";
import { Section, ViewAllDetails } from "../shared";
import "./GuestJoin.css";

export default function GuestJoin() {
  return (
    <Section className="guest-join">
      <div className="guest-join__inner">
        <div className="guest-join__head">
          <h2 className="guest-join__title">How Your Guest Can Join</h2>
          <p className="guest-join__subtitle">
            It’s simple! Invite your guests, and let them create, share and be a part of your special moments.
          </p>
        </div>

        {/* "rail" purani global class hai (scrollbar wagairah), isliye rakhi hai */}
        <ol className="rail guest-join__rail">
          {GUEST_STEPS.map((s) => (
            <li key={s.title} className="guest-join__step">
              {s.image ? (
                <Image
                  src={s.image}
                  alt=""
                  width={114}
                  height={81}
                  className="guest-join__image"
                />
              ) : (
                <ImagePlaceholder
                  label="Image pending"
                  className="guest-join__placeholder"
                />
              )}
              <h3 className="guest-join__step-title">{s.title}</h3>
              <p className="guest-join__step-text">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="guest-join__dots" aria-hidden>
          <span className="guest-join__dot guest-join__dot--active" />
          <span className="guest-join__dot" />
          <span className="guest-join__dot" />
          <span className="guest-join__dot" />
          <span className="guest-join__dot" />
        </div>

        <ViewAllDetails className="guest-join__view-all" />
      </div>
    </Section>
  );
}