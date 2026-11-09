import Link from "next/link";
import Seo from "../../components/Seo";
import AppHeader from "../../components/app/AppHeader";
import { clearedSessionCookie, fetchCurrentUser, fetchMyCapsules, getSessionToken } from "../../lib/auth";
import { formatEventDate } from "../../lib/dates";

// /capsules: all of the signed-in user's capsules, newest first.
export async function getServerSideProps({ req, res }) {
  const token = getSessionToken(req);
  const user = await fetchCurrentUser(token);
  if (!user) {
    if (token) res.setHeader("Set-Cookie", clearedSessionCookie());
    return { redirect: { destination: "/login?next=%2Fcapsules", permanent: false } };
  }
  res.setHeader("Cache-Control", "private, no-store");
  return { props: { capsules: await fetchMyCapsules(token) } };
}

export default function CapsulesPage({ capsules }) {
  return (
    <>
      <Seo title="My capsules — Snap Capsule" path="/capsules" robots="noindex, nofollow" />
      <div className="min-h-screen bg-[#faf7fc]">
        <AppHeader />
        <main className="mx-auto w-full max-w-[420px] px-4 pb-10 pt-6">
          <section className="rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(151,83,140,0.10)]" aria-labelledby="capsules-heading">
            <div className="flex items-center justify-between gap-3">
              <h1 id="capsules-heading" className="font-poppins text-[20px] font-bold text-brand-ink">
                My capsules
              </h1>
              <Link href="/?create=1" className="shrink-0 font-inter text-[14px] font-semibold text-brand hover:underline">
                + Create capsule
              </Link>
            </div>

            {capsules.length ? (
              <ul className="mt-4 flex flex-col gap-2">
                {capsules.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/capsules/${c.id}`}
                      className="flex items-center justify-between gap-3 rounded-[12px] border border-black/10 px-4 py-3 transition hover:border-brand hover:bg-brand/5"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-inter text-[15px] font-semibold text-black">{c.name}</span>
                        <span className="block font-inter text-[13px] text-muted">{formatEventDate(c.eventDate)}</span>
                      </span>
                      <span aria-hidden className="text-brand">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 font-inter text-[14px] text-muted">
                No capsules yet.{" "}
                <Link href="/?create=1" className="font-semibold text-brand hover:underline">
                  Create your first one
                </Link>
                .
              </p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
