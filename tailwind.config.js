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
        'content': 'calc(100vh - 60px)',
      },
      colors: {
        'one-light': '#fafafa',
        'vscode-bg': '#1f1f1f',
        'gold': '#ffdf00',
        'sunglow': '#ffcc33',
        'light-gold': '#fddc5c',
      }
    },
  },
  plugins: [],
}