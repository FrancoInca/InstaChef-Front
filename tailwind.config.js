/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
    './src/views/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'

  purge: [
    './index.html',
    './src/Componentes//*.{vue,js,ts,jsx,tsx}',
    './src/views/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

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

