import Image from "next/image";
import { IMAGES } from "./data";

// Full-bleed photo section. On mobile the photo spans the screen width like
// the design; on wider screens it sits in a rounded frame beside the copy.
export default function ShareQr() {
  return (
    <section className="mt-[13px] bg-gradient-to-b from-white to-[#fcf4ef] md:mt-20 md:bg-none">
      <div className="mx-auto w-full max-w-[420px] md:grid md:max-w-5xl md:grid-cols-2 md:items-center md:gap-12 md:px-6">
        <div className="px-3 pt-[25px] md:px-0 md:pt-0">
          <h2 className="font-poppins text-[20px] font-bold leading-[24px] text-brand-ink md:text-[32px] md:leading-tight">
            Share QR Code or Link
          </h2>
          <p className="mt-[2px] font-inter text-[13px] font-medium text-body md:mt-4 md:text-lg">
            Guests can scan your QR code or click on your link to instantly upload photos and videos to your online gallery.
            Beautiful templates included.
          </p>
        </div>
        <div className="md:overflow-hidden md:rounded-2xl md:shadow-lg">
          <Image
            src={IMAGES.qrPhoto}
            alt="QR code table stand next to a phone showing the event gallery"
            width={393}
            height={391}
            sizes="(min-width: 768px) 480px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[420px] md:mt-10 md:max-w-3xl md:px-6">
        <Image
          src={IMAGES.qrSteps}
          alt="1. View photos from the photographer by scanning the QR code. 2. Upload your own photos to help create everyone's memories."
          width={393}
          height={217}
          sizes="(min-width: 768px) 720px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
