/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenAccent: '#00ff88', // cor verde personalizada
        darkBg: '#0e0e0e',       // fundo escuro
      },
    },
  },
  plugins: [],
}
