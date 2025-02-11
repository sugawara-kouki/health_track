/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E8F5E9',
          DEFAULT: '#81C784',
          dark: '#4CAF50',
        },
        neutral: {
          light: '#FAFAFA',
          DEFAULT: '#F5F5F5',
          dark: '#EEEEEE',
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 15px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
