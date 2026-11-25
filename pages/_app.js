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
import { LocaleProvider } from "../lib/locale";
import { registerVisitor } from "../lib/visitor";

export default function App({ Component, pageProps }) {
  // Save this browser's visitor ID once when the site opens (lib/visitor.js).
  useEffect(() => {
    registerVisitor();
  }, []);
  // LocaleProvider re-applies the language/region chosen in the dropdown
  // (translation, prices, dates) on every page.
  return (
    <LocaleProvider>
      <Component {...pageProps} />
    </LocaleProvider>
  );
}
