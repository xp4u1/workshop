/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./web/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5b80a5",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
