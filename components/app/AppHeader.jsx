import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MenuIcon } from "../landing/icons";

// Header for signed-in pages: wordmark + menu (My capsules, Account, Sign out).
// The menu is a native <details>, so it opens without extra JavaScript.
export default function AppHeader() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    if (typeof window !== "undefined" && window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
    router.replace("/login");
  }

  const linkClass = "block px-4 py-2.5 font-inter text-sm font-medium text-brand-ink hover:bg-brand/5";

  return (
    <header className="sticky top-0 z-30 bg-white shadow-header">
      <div className="mx-auto flex h-[66px] w-full max-w-[780px] items-center justify-between px-4">
        {/* TODO(brand): swap this text wordmark for the Snap Capsule logo file. */}
        <Link href="/" aria-label="Snap Capsule home" className="shrink-0 font-poppins text-[20px] font-bold leading-none text-brand">
          Snap Capsule
        </Link>
        <details className="relative">
          <summary className="flex h-10 w-10 cursor-pointer items-center justify-center text-brand" aria-label="Open menu">
            <MenuIcon />
          </summary>
          <nav
            className="absolute right-0 top-12 w-52 overflow-hidden rounded-xl border border-black/5 bg-white py-2 shadow-lg"
            aria-label="Account"
          >
            <Link href="/capsules" className={linkClass}>
              My capsules
            </Link>
            <Link href="/account" className={linkClass}>
              Account
            </Link>
            <button type="button" onClick={signOut} disabled={signingOut} className={`${linkClass} w-full text-left disabled:opacity-60`}>
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </nav>
        </details>
      </div>
    </header>
  );
}
