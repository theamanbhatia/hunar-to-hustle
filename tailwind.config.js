/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold:       '#c9a84c',
        'gold-lt':  '#e8c878',
        'gold-dk':  '#9a7a30',
        dark:       '#0a0a0a',
        'dark-2':   '#111111',
        'dark-3':   '#1a1a1a',
        'off-white':'#f5f5f5',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
