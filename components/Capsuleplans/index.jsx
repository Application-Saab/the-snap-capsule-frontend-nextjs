import { useState } from "react";
import "./CapsulePlans.css";

// Abhi static data. Baad me API se plans prop me bhej dena (same shape).
const defaultPlans = [
  {
    id: 1,
    name: "SINGLE CAPSULE PLAN",
    price: "₹199",
    features: ["1 Event Capsule", "Up to 1,000 Photos per Capsule", "Annual Renewal"],
  },
  {
    id: 2,
    name: "UNLIMITED CAPSULE PLAN",
    price: "₹5000",
    features: ["Create Unlimited Event Capsule across the year", "Up to 1000 Photos"],
  },
  {
    id: 3,
    name: "SINGLE CAPSULE PLAN",
    subName: "(PHOTOS & VIDEOS)",
    price: "₹399",
    features: ["Photos & Videos", "Up to 1000 Photos", "Annual Renewal"],
  },
];

function CheckIcon() {
  return (
    <svg className="check-icon" width="18" height="18" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6 10.2l2.6 2.6L14 7.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

export default function CapsulePlans({ plans = defaultPlans, onSelect, onBack }) {
  const [selected, setSelected] = useState(plans[0]);

  const handleSelect = (plan) => {
    setSelected(plan);
    if (onSelect) onSelect(plan);
  };

  return (
    <div className="plans-container">
      <h1 className="plans-title">
        Choose Your <span>Event Capsule Package !</span>
      </h1>
      <p className="plans-subtitle">
        Preserve your special moments with our Event Capsule plans. Capture, store and relive your
        memories forever.
      </p>

      {plans.map((plan) => (
        <div className="plan-card" key={plan.id}>
          <div className="plan-header">
            <h2 className="plan-name">
              {plan.name} {plan.subName && <small>{plan.subName}</small>}
            </h2>
            <div className="plan-price">{plan.price}</div>
          </div>

          <ul className="plan-features">
            {plan.features.map((feature) => (
              <li key={feature}>
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>

          <button className="plan-btn" onClick={() => handleSelect(plan)}>
            Choose Annual Plan <span>→</span>
          </button>
        </div>
      ))}

      {/* Bottom fixed bar */}
      <div className="bottom-bar">
        <button className="bottom-back" onClick={() => onBack && onBack()}>
          <span className="bottom-back-arrow">‹</span>
          Back to Event Details
        </button>

        <div className="bottom-secure">
          <CardIcon />
          <span>{selected?.price} Payment Securely</span>
        </div>
      </div>
    </div>
  );
}