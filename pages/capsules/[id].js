import Seo from "../../components/Seo";
import AppHeader from "../../components/app/AppHeader";
import CapsuleHome from "../../components/capsule/CapsuleHome";
import { clearedSessionCookie, fetchCurrentUser, fetchMyCapsule, getSessionToken } from "../../lib/auth";

// /capsules/[id]: the host's page for one capsule. Server-rendered and
// private: no session → login (then back here); not yours or missing → 404.
export async function getServerSideProps({ req, res, params }) {
  const id = String(params.id);
  const loginRedirect = {
    redirect: { destination: `/login?next=${encodeURIComponent(`/capsules/${id}`)}`, permanent: false },
  };

  const token = getSessionToken(req);
  const user = await fetchCurrentUser(token);
  if (!user) {
    if (token) res.setHeader("Set-Cookie", clearedSessionCookie());
    return loginRedirect;
  }

  const { capsule, status } = await fetchMyCapsule(token, id);
  if (status === 401) return loginRedirect;
  if (status === 404) return { notFound: true };
  if (!capsule) throw new Error(`Couldn't load capsule ${id} (status ${status})`);

  res.setHeader("Cache-Control", "private, no-store");
  return { props: { capsule, hostName: user.name || null } };
}

export default function CapsulePage({ capsule, hostName }) {
  return (
    <>
      <Seo title={`${capsule.name} — Snap Capsule`} path={`/capsules/${capsule.id}`} robots="noindex, nofollow" />
      <div className="min-h-screen bg-white">
        <AppHeader />
        <main>
          <CapsuleHome capsule={capsule} hostName={hostName} />
        </main>
      </div>
    </>
  );
}
