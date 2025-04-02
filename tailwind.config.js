/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'], // 기본 sans-serif를 Pretendard로 변경
      },
      colors: {
        'basic-black': 'var(--basic-black)',
        'basic-white': 'var(--basic-white)',
        'gray-light': 'var(--gray-light)',
        'gray-light-medium': 'var(--gray-light-medium)',
        'gray-medium': 'var(--gray-medium)',
        'gray-medium-dark': 'var(--gray-medium-dark)',
        'gray-dark': 'var(--gray-dark)',
        'gray-dark-reply': 'var(--gray-dark-reply)',
        'main-primary': 'var(--main-primary)',
        'main-warning': 'var(--main-warning)',
        'main-success': 'var(--main-success)',
      },
    },
  },
  plugins: [],
}
