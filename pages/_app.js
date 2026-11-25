import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/roboto/600-italic.css";
import "../app/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { LocaleProvider } from "../lib/locale";
import { getCurrentLanguage } from "../lib/translate";
import { trackPageView } from "../lib/visitor";

// Records each page view with this browser's visitor ID (lib/visitor.js):
// the first page on load, then every page opened inside the site.
function usePageViewTracking() {
  const router = useRouter();
  useEffect(() => {
    const track = (url) => trackPageView(url, getCurrentLanguage().id);
    track(router.asPath);
    router.events.on("routeChangeComplete", track);
    return () => router.events.off("routeChangeComplete", track);
    // Once per app load; later pages come from routeChangeComplete.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function App({ Component, pageProps }) {
  usePageViewTracking();
  // LocaleProvider re-applies the language/region chosen in the dropdown
  // (translation, prices, dates) on every page.
  return (
    <LocaleProvider>
      <Component {...pageProps} />
    </LocaleProvider>
  );
}
