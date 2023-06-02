/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
    './src/views/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'

  purge: ['./index.html', "./src/Componentes", './src/views/*.{vue,js,ts,jsx,tsx}'],
 
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#26A4FF',
          500: '#2563C0',
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

