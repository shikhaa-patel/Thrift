/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xsm': "340px",
      'sm': "568px",
      'md': "768px",
      'md2': "921px",
      'lg': "1024px",
      'lg2': "1150px",
      'xl': "1280px",
      '2xl': "1536px",
    },
  },
  plugins: [],
}

