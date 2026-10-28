import Image from "next/image";
import { TESTIMONIALS } from "../data";
import { ImagePlaceholder, QuoteMark, Stars } from "../icons";
import { Section } from "../shared";
import "./Testimonials.css";

export default function Testimonials() {
  return (
    <Section>
      <div className="testimonials">
        <h2 className="testimonials__title">Loved By thousands of happy customers</h2>
        <ul className="rail testimonials__rail">
          {TESTIMONIALS.map((t, i) => (
            <li key={i} className="testimonials__card">
              {t.image ? (
                <Image
                  src={t.image}
                  alt={`Photo of ${t.name}`}
                  width={171}
                  height={187}
                  className="testimonials__image"
                />
              ) : (
                <ImagePlaceholder
                  label="Photo pending"
                  className="testimonials__placeholder"
                />
              )}
              <figure className="testimonials__figure">
                <blockquote className="testimonials__quote">
                  <QuoteMark className="testimonials__quote-open" />
                  {t.quote}
                  <QuoteMark flip className="testimonials__quote-close" />
                </blockquote>
                <figcaption className="testimonials__caption">
                  {t.name}
                  <Stars size={11} className="testimonials__stars" />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}