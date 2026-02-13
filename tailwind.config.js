/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          dark: "#163b6d",
          gray: "#4f4c4c",
        },
      },
    },
  },
  plugins: [],
};
