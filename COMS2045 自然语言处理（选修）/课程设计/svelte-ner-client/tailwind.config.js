/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      boxShadow: {
        outer: '0 0 0 1px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        light: '#f3f3f3',
        primary: '#60a5fa',
      },
    },
  },
  plugins: [],
};
