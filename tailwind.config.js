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
        // 민죠이케어 - 인디핑크
        primary: '#D4A5A5',
        'primary-dark': '#C48B8B',
        'primary-light': '#E8C4C4',
        // 민죠이짐 - 레드
        gym: '#B22222',
        'gym-dark': '#8B0000',
        'gym-light': '#CD5C5C',
        // 브랜드 컬러
        ivory: '#FAF7F2',
        'ivory-dark': '#F5EDE3',
        brown: '#8B6914',
        'brown-dark': '#5C4A1A',
        'brown-light': '#A68B5B',
        // 골드 악센트 (샹들리에 느낌)
        gold: '#D4AF37',
        'gold-light': '#F0E68C',
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
