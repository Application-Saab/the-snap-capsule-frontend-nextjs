import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Seo from "../components/Seo";
import { clearedSessionCookie, fetchCurrentUser, fetchMyCapsules, getSessionToken } from "../lib/auth";
import { formatEventDate } from "../lib/dates";

// Signed-in page: the user and their capsules. Rendered on the server:
// no session → /login.
export async function getServerSideProps({ req, res, query }) {
  const token = getSessionToken(req);
  const user = await fetchCurrentUser(token);
  if (!user) {
    if (token) res.setHeader("Set-Cookie", clearedSessionCookie());
    return { redirect: { destination: "/login?next=%2Faccount", permanent: false } };
  }
  res.setHeader("Cache-Control", "private, no-store");
  const capsules = await fetchMyCapsules(token);
  const createdId = typeof query.created === "string" ? query.created : null;
  return { props: { user, capsules, createdId } };
}

export default function AccountPage({ user, capsules, createdId }) {
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
      <div className="min-h-screen bg-[#faf7fc] px-4 pb-10">
        <div className="mx-auto flex h-[66px] w-full max-w-[780px] items-center">
          <Link href="/" className="font-poppins text-[20px] font-bold leading-none text-brand">
            Snap Capsule
          </Link>
        </div>
        <main className="mx-auto mt-6 flex w-full max-w-[420px] flex-col gap-4">
          {createdId && capsules.some((c) => c.id === createdId) ? (
            <p
              className="rounded-[12px] bg-[#e9f7ee] px-4 py-3 text-center font-inter text-[14px] font-medium text-[#1f7a43]"
              role="status"
            >
              Your capsule is ready!
            </p>
          ) : null}

          <section
            className="rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(151,83,140,0.10)]"
            aria-labelledby="capsules-heading"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 id="capsules-heading" className="font-poppins text-[18px] font-bold text-brand-ink">
                Your capsules
              </h2>
              <Link href="/?create=1" className="shrink-0 font-inter text-[14px] font-semibold text-brand hover:underline">
                + Create capsule
              </Link>
            </div>
            {capsules.length ? (
              <ul className="mt-3 flex flex-col gap-2">
                {capsules.map((c) => (
                  <li
                    key={c.id}
                    className={`flex items-center justify-between gap-3 rounded-[12px] border px-4 py-3 ${
                      c.id === createdId ? "border-brand bg-brand/5" : "border-black/10"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-inter text-[15px] font-semibold text-black">{c.name}</p>
                      <p className="font-inter text-[13px] text-muted">{formatEventDate(c.eventDate)}</p>
                    </div>
                    {c.id === createdId ? (
                      <span className="shrink-0 rounded-full bg-brand px-2 py-[2px] font-inter text-[11px] font-semibold text-white">
                        New
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 font-inter text-[14px] text-muted">
                No capsules yet.{" "}
                <Link href="/?create=1" className="font-semibold text-brand hover:underline">
                  Create your first one
                </Link>
                .
              </p>
            )}
          </section>

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
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="mt-6 h-[44px] w-full rounded-[10px] border border-brand font-inter text-[15px] font-semibold text-brand hover:bg-brand/5 disabled:opacity-60"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </section>
        </main>
      </div>
    </>
  );
}
