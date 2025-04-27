/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // ← Add this line
  theme: {
    extend: {
      colors: {
        primary: "#04a784",
        primaryDense: "#008069",
      },
    },
  },
  plugins: [],
};