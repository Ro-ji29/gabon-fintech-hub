/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}', './data/**/*.js'],
  theme: {
    extend: {
      colors: {
        forest: { 700: '#1c594c', 800: '#123c35', 900: '#0d302b', 950: '#082722' },
        jade: { 50: '#effbf4', 100: '#d9f5e5', 200: '#b7ebd0', 300: '#87dbb2', 600: '#15805e', 700: '#116d51', 800: '#105941', 900: '#104a39' },
        ivory: { 50: '#fffefa', 100: '#f5f4ed' },
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
