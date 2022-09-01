/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./comps/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dead_violet': '#9988CC',
        'nav_black': "#000500",
        "grad_to": "#4286f4",
        "grad_from": '#373f44',
        'text-gray': '#868686',
        "grad_to_dark": '#2e3234',
        "grad_from_dark": '#0944a2',
        "light-white": "rgba(255,255,255,0.17)",
        "navbar": "#3A6EA5",
        "icon-bg":"#004E98",
        "content":"#EBEBEB",
        "content-sec":"#C0C0C0",
        "wild-orange":"#FF6700"
      },
    },
  },
  plugins: [],
}
