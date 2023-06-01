/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      fontSize: {
        sm: ['14px', '23px'],
        base: ['11px', '21px'],
        mini: ["7", "12"],
        lg: ['20px', '28px'],
        xl: ['35px', '52px'],
        xlg: ['55px', '62px'],
        medio: ['18px', '26px'],
      },
    },
  },
  plugins: [],
}

