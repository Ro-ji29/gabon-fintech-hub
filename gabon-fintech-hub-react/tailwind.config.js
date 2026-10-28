/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}', './data/**/*.js'],
  theme: {
    extend: {
      colors: {
        /* Palette Bleue FinTech Principale */
        navy: {
          700: 'var(--color-navy-700)',
          800: 'var(--color-navy-800)',
          900: 'var(--color-navy-900)',
          950: 'var(--color-navy-950)',
        },
        blue: {
          50:  'var(--color-blue-50)',
          100: 'var(--color-blue-100)',
          200: 'var(--color-blue-200)',
          300: 'var(--color-blue-300)',
          400: 'var(--color-blue-400)',
          500: 'var(--color-blue-500)',
          600: 'var(--color-blue-600)',
          700: 'var(--color-blue-700)',
          800: 'var(--color-blue-800)',
          900: 'var(--color-blue-900)',
        },
        ivory: {
          50: 'var(--color-ivory-50)',
          100: 'var(--color-ivory-100)',
        },
        /* Aliases de compatibilité et centralisation :
           mappent automatiquement les classes existantes (forest, jade)
           sur la nouvelle palette bleue */
        forest: {
          700: 'var(--color-navy-700)',
          800: 'var(--color-navy-800)',
          900: 'var(--color-navy-900)',
          950: 'var(--color-navy-950)',
        },
        jade: {
          50:  'var(--color-blue-50)',
          100: 'var(--color-blue-100)',
          200: 'var(--color-blue-200)',
          300: 'var(--color-blue-300)',
          400: 'var(--color-blue-400)',
          500: 'var(--color-blue-500)',
          600: 'var(--color-blue-600)',
          700: 'var(--color-blue-700)',
          800: 'var(--color-blue-800)',
          900: 'var(--color-blue-900)',
        },
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
