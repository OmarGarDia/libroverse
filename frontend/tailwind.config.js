/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "indigo-deep": "#2C3E50",
        "cream-paper": "#FDFBF6",
        "turquoise-accent": "#4DB6AC",
        "gold-accent": "#D4AF37",
        "dark-gray-text": "#34495E",
        "warm-gray": "#7F8C8D",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        lora: ["Lora", "serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
