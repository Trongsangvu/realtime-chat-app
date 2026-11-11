/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#4f6bf5",
          600: "#4256e8",
          700: "#6a45dc",
        },
        ink: { DEFAULT: "#12132b", soft: "#5b5f7a" },
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(79, 107, 245, 0.25)",
        glass: "0 8px 30px -8px rgba(40, 50, 120, 0.25)",
      },
    },
  },
  plugins: [],
};
