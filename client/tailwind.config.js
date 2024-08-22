/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EE8CD9",
        secondary: "#201C4D",
      },
    },
  },
  plugins: [require("daisyui")],
};
