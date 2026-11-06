import Link from "next/link";
import Seo from "../components/Seo";
import LoginCard from "../components/auth/LoginCard";
import { fetchCurrentUser, getSessionToken, safeNextPath } from "../lib/auth";

// Already signed in → skip the login screen.
export async function getServerSideProps({ req, query }) {
  const next = safeNextPath(query.next);
  const user = await fetchCurrentUser(getSessionToken(req));
  if (user) {
    return { redirect: { destination: next, permanent: false } };
  }
  return { props: { next } };
}

// Full-page version of the login screen (direct links, and the fallback when
// the home page popup can't open). The popup uses the same LoginCard.
export default function LoginPage({ next }) {
  return (
    <>
      <Seo
        title="Sign in — Snap Capsule"
        description="Sign in to Snap Capsule to create and share your event capsules."
        path="/login"
        robots="noindex, nofollow"
      />
      <div className="min-h-screen bg-[#faf7fc] px-4 pb-10">
        <div className="mx-auto flex h-[66px] w-full max-w-[780px] items-center">
          <Link href="/" className="font-poppins text-[20px] font-bold leading-none text-brand">
            Snap Capsule
          </Link>
        </div>
        <main className="mx-auto mt-6 w-full max-w-[420px]">
          <LoginCard next={next} />
        </main>
      </div>
    </>
  );
}
