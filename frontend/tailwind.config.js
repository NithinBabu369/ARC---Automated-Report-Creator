/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '4xl': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}