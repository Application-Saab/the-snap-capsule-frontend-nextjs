import Image from "next/image";
import { IMAGES } from "./data";

// Full-bleed photo on phones like the design; capped at 560px and centred
// inside the 780px page container on wider screens.
export default function ShareQr() {
  return (
    <section className="mt-[13px] bg-gradient-to-b from-white to-[#fcf4ef]">
      <div className="mx-auto w-full max-w-[780px]">
        <div className="px-3 pt-[25px]">
          <h2 className="font-poppins text-[20px] font-bold leading-[24px] text-brand-ink">
            Share QR Code or Link
          </h2>
          <p className="mt-[2px] font-inter text-[13px] font-medium text-body">
            Guests can scan your QR code or click on your link to instantly upload photos and videos to your online gallery.
            Beautiful templates included.
          </p>
        </div>
        <div className="mx-auto max-w-[560px]">
          <Image
            src={IMAGES.qrPhoto}
            alt="QR code table stand next to a phone showing the event gallery"
            width={393}
            height={391}
            sizes="(min-width: 560px) 560px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[560px]">
        <Image
          src={IMAGES.qrSteps}
          alt="1. View photos from the photographer by scanning the QR code. 2. Upload your own photos to help create everyone's memories."
          width={393}
          height={217}
          sizes="(min-width: 560px) 560px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
