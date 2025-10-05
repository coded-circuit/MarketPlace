/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.gray,
      },
    },
  },
  plugins: [],
};
// "primary": "#137fec",
//                         "background-light": "#f6f7f8",
//                         "background-dark": "#101922",
//                         "foreground-light": "#111418",
//                         "foreground-dark": "#f6f7f8",
//                         "subtle-light": "#617589",
//                         "subtle-dark": "#a0b3c4",
//                         "border-light": "#dbe0e6",
//                         "border-dark": "#2a3b4c",
//                         "surface-light": "#ffffff",
//                         "surface-dark": "#182431"