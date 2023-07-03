/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        compLightBlue: '#3498db',
        compDarkBlue: '#0569df',
        compGreyText: '#555',
        compDKMLightBlue: '#0569df',
        compDKMDarkBlue: '#3498db',
        compDKMGreyText: '#999',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
