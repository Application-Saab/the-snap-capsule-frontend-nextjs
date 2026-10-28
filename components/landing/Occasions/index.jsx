import Image from "next/image";
import { OCCASIONS } from "../data";
import { ImagePlaceholder } from "../icons";
import { Section } from "../shared";
import "./Occasions.css";

export default function Occasions() {
  return (
    <Section>
      <div className="occasions">
        <div className="occasions__head">
          <h2 className="occasions__title">Perfect For Every Occasion</h2>
          <p className="occasions__subtitle">
            No matter the event, your memories stay safe, organized and easy to relive
          </p>
        </div>
        {/* "rail" purani global class hai (scrollbar wagairah), isliye rakhi hai */}
        <ul className="rail occasions__rail">
          {OCCASIONS.map((o) => (
            <li key={o.label} className="occasions__item">
              {o.image ? (
                <Image
                  src={o.image}
                  alt={o.label}
                  width={70}
                  height={70}
                  className="occasions__image"
                />
              ) : (
                <ImagePlaceholder
                  label="Image pending"
                  className="occasions__placeholder"
                />
              )}
              <span className="occasions__label">{o.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}