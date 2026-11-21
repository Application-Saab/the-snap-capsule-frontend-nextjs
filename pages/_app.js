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
import { initTranslation } from "../lib/translate";

export default function App({ Component, pageProps }) {
  // Re-applies the language chosen in the dropdown (if not English).
  useEffect(() => {
    initTranslation();
  }, []);

  return <Component {...pageProps} />;
}
