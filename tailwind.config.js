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
        compDarkBlue: '#013e9c',
        compGreyText: '#555',
        compDKMLightBlue: '#013e9c',
        compDKMDarkBlue: '#3498db',
        compDKMGreyText: '#999',

        //  New Dark Mode

        Primary: '#001F5A',
        Secondary: '#0050AE',
        darkPastleRed: '#F87060',
        darkPastleYellow: '#FFFAA0',
        darkPastleGreen: '#85FF9E',

        darkBgPrimary: '#111111', // For body background
        darkBgSecondary: '#272727', // for card background
        darkBgTertiary: '#3e3e3e', // For Buttons, Dropdowns, Inputs
        darkBgQuaternary: '#565656', // For Modals, Dialogs and Test
        darkBgQuinary: '#707070',

        darkTxtPrimary: '#16171f', // For body background
        darkTxtSecondary: '#2b2c34', // for card background
        darkTxtTertiary: '#42434a', // For Buttons, Dropdowns, Inputs
        darkTxtQuaternary: '#5a5b61', // For Modals, Dialogs and Test
        darkTxtQuinary: '#737479',

      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
