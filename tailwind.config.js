/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/Componentes',
    '.src/views/*',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ], //Franco: Segun nueva documentación, el nombre apropiado es content
  darkMode: 'media', // or 'media' or 'class' Franco: Segun nueva documentación, es recomendable dejarlo en media
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#DC2626',
          500: '#B61F1F',
        },
      },
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
  plugins: [],
};
