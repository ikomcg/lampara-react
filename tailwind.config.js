/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#60a5fa',
      },
      width: {
        '95': '95%',
      }
    },
  },
  plugins: [],
}