import Seo from "../components/Seo";
import BrandLogo from "../components/BrandLogo";
import CapsuleHome from "../components/capsule/CapsuleHome";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { backendUrl, clearedSessionCookie, getSessionToken } from "../lib/auth";

// /weblink-gallery?galleryId=<folder _id>: the Event Capsule page the
// backend's webLink points to. Server-rendered for the signed-in owner.
export async function getServerSideProps({ req, res, query }) {
  const galleryId = typeof query.galleryId === "string" ? query.galleryId : "";
  if (!galleryId) return { notFound: true };

  const token = getSessionToken(req);
  if (!token) return { redirect: { destination: "/", permanent: false } };

  let backendRes;
  try {
    backendRes = await fetch(backendUrl(`/api/internal/event-capsule/${encodeURIComponent(galleryId)}`), {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new Error("Couldn't reach the backend to load the capsule.");
  }
  if (backendRes.status === 401) {
    res.setHeader("Set-Cookie", clearedSessionCookie());
    return { redirect: { destination: "/", permanent: false } };
  }
  if (backendRes.status === 404) return { notFound: true };
  const data = await backendRes.json().catch(() => ({}));
  if (!backendRes.ok || data.error || !data.data) {
    throw new Error(`Couldn't load capsule ${galleryId} (status ${backendRes.status})`);
  }

  res.setHeader("Cache-Control", "private, no-store");
  const capsule = data.data;
  return {
    props: {
      capsule: {
        id: capsule.folderId,
        name: capsule.eventName,
        eventDate: capsule.eventDate,
        shortCode: capsule.shortCode || null,
      },
    },
  };
}

export default function WeblinkGalleryPage({ capsule }) {
  return (
    <>
      <Seo title={`${capsule.name} — Snap Capsule`} path="/weblink-gallery" robots="noindex, nofollow" />
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-30 bg-white shadow-header">
          <div className="mx-auto flex h-[66px] w-full max-w-[780px] items-center justify-between px-4">
            <BrandLogo />
            <LanguageSwitcher />
          </div>
        </header>
        <main>
          <CapsuleHome capsule={capsule} />
        </main>
      </div>
    </>
  );
}
