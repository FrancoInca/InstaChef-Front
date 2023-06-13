/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  //Franco: Según nueva documentación, el nombre apropiado es content
  content: [
    './index.html',
    './src/Componentes',
    '.src/components',
    '.src/views/*',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class' Franco: Según nueva documentación, es recomendable dejarlo en media

  theme: {
    extend: {
      colors: {
        primary: {
          400: '#fbbf24',
          500: '#c7981c',
        },
        backColor: {
          400: '#24252B',
          500: '#1E1F22',
        },
      },
      fontFamily: {
        playfair: 'Playfair Display'
      }
    },
  },
  variants: {
    extend: {
      fontSize: {
        sm: ['14px', '23px'],
        base: ['11px', '21px'],
        mini: ['7', '12'],
        lg: ['20px', '28px'],
        xl: ['35px', '52px'],
        xlg: ['55px', '62px'],
        medio: ['18px', '26px'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
