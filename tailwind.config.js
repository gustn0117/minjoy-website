/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C4918A',
        'primary-dark': '#B07D76',
        'primary-light': '#D4A9A3',
        'primary-50': '#FBF5F4',
        'primary-100': '#F5E8E6',
        ivory: '#FAF7F2',
        brown: {
          DEFAULT: '#6B4F47',
          dark: '#4A3530',
          light: '#8B7670',
        },
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
