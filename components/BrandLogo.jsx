import Image from "next/image";
import Link from "next/link";

// The Snap Capsule logo (public/logo.webp, transparent background), linking
// home. Used in the site headers. `translate="no"` keeps Google's page
// translation away from the brand name in the alt text.
export default function BrandLogo({ className = "" }) {
  return (
    <Link href="/" aria-label="Snap Capsule home" className={`notranslate shrink-0 ${className}`} translate="no">
      <Image
        src="/logo.webp"
        alt="Snap Capsule"
        width={335}
        height={208}
        quality={90}
        sizes="84px"
        priority
        className="h-[52px] w-auto"
      />
    </Link>
  );
}
