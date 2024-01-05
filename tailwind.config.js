/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '1em': '1em',
      },
      height: {
        '98p': '98%',
      },
      colors: {
        'one-light': '#fafafa',
      }
    },
  },
  plugins: [],
}