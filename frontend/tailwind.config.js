/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppinsLight: ['PoppinsLight', 'sans-serif'],
        poppinsRegular: ['PoppinsRegular', 'sans-serif'],
        poppinsBold: ['PoppinsBold', 'sans-serif'],
        poppinsItalic: ['PoppinsItalic', 'sans-serif'],
      },
      colors: {
        primary: '#0d1b2a',
        secondary: '#e0e1dd',
        tertiary: '#070F18',
        paleLilac: '#1b263b',
        darkBabyBlue: '#d67c6a',
        lightBabyBlue: '#778da9',

    },
  },
  },
  plugins: [],
}