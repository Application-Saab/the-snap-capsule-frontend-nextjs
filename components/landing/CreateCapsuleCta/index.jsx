import Image from "next/image";
import { IMAGES } from "../data";
import { PrimaryButton, Section } from "../shared";
import "./CreateCapsuleCta.css";

export default function CreateCapsuleCta() {
  return (
    <Section>
      <div className="create-capsule">
        <Image
          src={IMAGES.createCapsuleBox}
          alt=""
          width={116}
          height={146}
          className="create-capsule__image"
        />
        <div className="create-capsule__body">
          <h2 className="create-capsule__title">Create Event Capsule</h2>
          <p className="create-capsule__text">
            Build your Event Capsule from the ground up. Add details, photos, settings and make it truly yours.
          </p>
          <PrimaryButton href="#plans" className="create-capsule__cta">
            Create Now
          </PrimaryButton>
        </div>
      </div>
    </Section>
  );
}