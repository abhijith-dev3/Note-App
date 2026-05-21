/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        terracotta: "#B85C38",
        "terracotta-dark": "#9E4D2F",
      },

      fontFamily: {
        lora: ["Lora", "serif"],
      },

      borderRadius: {
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};