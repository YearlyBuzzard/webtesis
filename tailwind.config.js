/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        spin: 'spin 1s linear infinite',
      },
      colors: {
        purple: {
          '100': '#EDE9FE',
          '200': '#DDD6FE',
          '300': '#C4B5FD',
          '400': '#A78BFA',
          '500': '#8B5CF6',
          '600': '#7C3AED',
          '700': '#6D28D9',
          '800': '#5B21B6',
          '900': '#4C1D95',
        },
        blue: {
          '100': '#EFF6FF',
          '200': '#DBEAFE',
          '300': '#BFDBFE',
          '400': '#93C5FD',
          '500': '#60A5FA',
          '600': '#3B82F6',
          '700': '#2563EB',
          '800': '#1D4ED8',
          '900': '#1E40AF',
        },
      },
    },   
   },
      plugins: [],
    }