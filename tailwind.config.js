/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx}","./pages/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0D0D0D",
        spectral: "#F5F5F5",
        aurablue: "#4FC3F7",
      },
      boxShadow: {
        "aura": "0 0 60px rgba(79,195,247,0.2)",
      }
    },
  },
  plugins: [],
};
