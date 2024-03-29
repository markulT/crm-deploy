/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./comps/**/*.{js,ts,jsx,tsx}"
  ],
  daisyui: {
    themes: [
      {
        whiteSoft: {

          "primary": "#4880FF",

          "secondary": "#ff8743",

          "accent": "#1fb2a6",

          "neutral": "#2a323c",

          "info": "#23324D",

          "success": "#36d399",

          "warning": "#fbbd23",

          "error": "#f87272",
        },
      },
    ],
  },
  theme: {
    screens: {
      'xs': '440px',
      // => @media (min-width: 440px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'active': '#4880FF',
      'active-dark': '#3a66cc',
      'button': '#ff8743',
      'button-dark': '#cc6c36',
      'error': '#fd5454',
      'warning': '#fcbe2d',
      'success': '#00a48c',
      'success-dark': '#00927c',
      'primary-text': '#202224',
      'secondary-text': '#606060',
      'disabled-text': '#a6a6a6',
      'outline': '#F1F4F9',
      'white': '#ffffff'
    },

    extend: {
      fontFamily:{
        'primary': ['Nunito Sans']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
}