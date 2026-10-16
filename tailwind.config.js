/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Values taken from the Figma landing page design.
        brand: {
          DEFAULT: "#97538c", // primary buttons, links, accents
          deep: "#4a1069", // plan titles & prices
          ink: "#1e0756", // section headings
        },
        body: "#494949",
        muted: "#61677c",
        subtle: "#6b6478",
        danger: "#e84f43",
        royal: "#21009c",
      },
      fontFamily: {
        poppins: ["Poppins", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
        roboto: ["Roboto", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 5px 3px rgba(0,0,0,0.05)",
        plan: "0 -2px 2px rgba(0,0,0,0.11), 0 4px 2px rgba(0,0,0,0.11)",
        header: "0 4px 5px rgba(0,0,0,0.25)",
        faq: "0 5px 2px rgba(193,193,193,0.1)",
      },
    },
  },
  plugins: [],
};
