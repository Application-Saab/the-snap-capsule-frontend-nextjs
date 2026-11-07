import Image from "next/image";
import { IMAGES } from "../data";
import "./shareQr.css";

// Full-bleed photo on phones like the design; capped at 560px and centred
// inside the 780px page container on wider screens.
export default function ShareQr() {
  return (

      <div className="share-qr__container">
        <div className="share-qr__head">
          <h2 className="share-qr__title">Share QR Code or Link</h2>
          <p className="share-qr__text">
            Guests can scan your QR code or click on your link to instantly upload photos and videos to your online gallery.
            Beautiful templates included.
          </p>
        </div>
        <div className="share-qr__photo">
          <Image
            src={IMAGES.qrPhoto}
            alt="QR code table stand next to a phone showing the event gallery"
            width={393}
            height={391}
            sizes="(min-width: 560px) 560px, 100vw"
            className="share-qr__image"
          />
        </div>
      </div>
    
  );
}