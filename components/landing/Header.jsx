import Image from "next/image";
import Link from "next/link";
import { IMAGES, NAV_LINKS } from "./data";
import { MenuIcon } from "./icons";

// Mobile shows the logo + hamburger from the design; the menu opens with a
// native <details> element so it works without client-side JavaScript.
export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-header">
      <div className="mx-auto flex h-[66px] w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" aria-label="HORA Snap Capsule home" className="shrink-0">
          <Image src={IMAGES.logo} alt="HORA" width={33} height={41} priority />
        </Link>

        <nav className="hidden items-center gap-8 font-inter text-sm font-medium text-brand-ink md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand">
              {l.label}
            </a>
          ))}
          <a href="#plans" className="rounded-[6px] bg-brand px-4 py-2 text-white hover:bg-[#82467a]">
            Create Capsule
          </a>
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer items-center justify-center text-brand" aria-label="Open menu">
            <MenuIcon />
          </summary>
          <nav
            className="absolute right-0 top-12 w-52 overflow-hidden rounded-xl border border-black/5 bg-white py-2 shadow-lg"
            aria-label="Main"
          >
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="block px-4 py-2.5 font-inter text-sm font-medium text-brand-ink hover:bg-brand/5">
                {l.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
