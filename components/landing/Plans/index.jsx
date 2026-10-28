import { PLANS } from "../data";
import { CheckCircle } from "../icons";
import { PrimaryButton, Section, SectionHeading } from "../shared";
import "./Plans.css";

export default function Plans() {
  return (
    <Section id="plans">
      <div className="plans">
        <SectionHeading title="Choose Perfect Plan For Event" />
        {/* "rail" purani global class hai (scrollbar wagairah), isliye rakhi hai */}
        <ul className="rail plans__rail">
          {PLANS.map((p) => (
            <li key={p.variant} className="plans__card">
              <div className="plans__head">
                <h3 className="plans__name">{p.name}</h3>
                <p className="plans__variant">{p.variant}</p>
              </div>
              <ul className="plans__features">
                {p.features.map((f) => (
                  <li key={f} className="plans__feature">
                    <CheckCircle className="plans__check" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="plans__price">
                <span className="plans__price-label">Price</span>{" "}
                <span className="plans__price-amount">{p.price}</span>
              </p>
              <PrimaryButton href="#" icon={null} className="plans__cta">
                {p.cta}
              </PrimaryButton>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}