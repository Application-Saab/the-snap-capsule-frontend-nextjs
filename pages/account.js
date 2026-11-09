import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Seo from "../components/Seo";
import AppHeader from "../components/app/AppHeader";
import { clearedSessionCookie, fetchCurrentUser, getSessionToken } from "../lib/auth";

// /account: profile and sign out. Capsules live at /capsules.
// Rendered on the server: no session → /login.
export async function getServerSideProps({ req, res }) {
  const token = getSessionToken(req);
  const user = await fetchCurrentUser(token);
  if (!user) {
    if (token) res.setHeader("Set-Cookie", clearedSessionCookie());
    return { redirect: { destination: "/login?next=%2Faccount", permanent: false } };
  }
  res.setHeader("Cache-Control", "private, no-store");
  return { props: { user } };
}

export default function AccountPage({ user }) {
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

  const initial = (user.name || user.email || "?").trim().charAt(0).toUpperCase();

  return (
    <>
      <Seo title="My account — Snap Capsule" path="/account" robots="noindex, nofollow" />
      <div className="min-h-screen bg-[#faf7fc]">
        <AppHeader />
        <main className="mx-auto w-full max-w-[420px] px-4 pb-10 pt-6">
          <section className="rounded-[24px] bg-white p-6 text-center shadow-[0_10px_30px_rgba(151,83,140,0.10)]">
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt=""
                width={72}
                height={72}
                referrerPolicy="no-referrer"
                className="mx-auto h-[72px] w-[72px] rounded-full object-cover"
              />
            ) : (
              <span className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand/15 font-poppins text-[28px] font-bold text-brand">
                {initial}
              </span>
            )}
            <h1 className="mt-4 font-poppins text-[22px] font-bold text-brand-ink">
              {user.name ? `Hi, ${user.name.split(" ")[0]}` : "You're signed in"}
            </h1>
            {user.email ? <p className="mt-1 font-inter text-[14px] text-muted">{user.email}</p> : null}
            <Link
              href="/capsules"
              className="mt-6 flex h-[44px] w-full items-center justify-center rounded-[10px] bg-brand font-inter text-[15px] font-semibold text-white hover:bg-[#82467a]"
            >
              My capsules
            </Link>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="mt-3 h-[44px] w-full rounded-[10px] border border-brand font-inter text-[15px] font-semibold text-brand hover:bg-brand/5 disabled:opacity-60"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </section>
        </main>
      </div>
    </>
  );
}
