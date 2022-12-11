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
        "grad_to":"#537895",
        "grad_from":'#09203F',
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
      keyframes: {
        right_pag: {
          '0%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(70px, 0px)' },
          '100%': { transform: 'translate(0px, 0px)' },
      },
      left_pag: {
        '0%': { transform: 'translate(0px, 0px)' },
        '50%': { transform: 'translate(-70px, 0px)' },
        '100%': { transform: 'translate(0px, 0px)' },
    },
     refresh: {
'0%': {transform: 'rotate(0deg)'},
'100%': {transform: 'rotate(-360deg)'}
     },
    },
      animation: {
        'right_pag_animate': 'right_pag 1s ease-in-out',
        'left_pag_animate': 'left_pag 1s ease-in-out',
        'refresh_rotate': 'refresh 0.7s ease-in-out'

      }

    },
  },
  plugins: [],
}
