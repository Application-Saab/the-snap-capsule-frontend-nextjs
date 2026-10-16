import Link from "next/link";
import { NAV_LINKS } from "./data";
import { MenuIcon } from "./icons";

// Wordmark + hamburger at every width; the menu opens with a
// native <details> element so it works without client-side JavaScript.
export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-header">
      <div className="mx-auto flex h-[66px] w-full max-w-[780px] items-center justify-between px-4">
        {/* TODO(brand): swap this text wordmark for the Snap Capsule logo file. */}
        <Link
          href="/"
          aria-label="Snap Capsule home"
          className="shrink-0 font-poppins text-[20px] font-bold leading-none text-brand"
        >
          Snap Capsule
        </Link>


        <details className="group relative">
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
