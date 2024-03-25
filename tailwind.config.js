/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx,svg}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
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

        // light mode
        tremor: {
          brand: {
            faint: colors.zinc[50],
            muted: colors.zinc[200],
            subtle: colors.zinc[400],
            DEFAULT: colors.zinc[500],
            emphasis: colors.zinc[700],
            inverted: colors.white,
          },
          background: {
            muted: colors.zinc[50],
            subtle: colors.zinc[100],
            DEFAULT: colors.white,
            emphasis: colors.zinc[700],
          },
          border: {
            DEFAULT: colors.zinc[200],
          },
          ring: {
            DEFAULT: colors.zinc[200],
          },
          content: {
            subtle: colors.zinc[400],
            DEFAULT: colors.zinc[500],
            emphasis: colors.zinc[700],
            strong: colors.zinc[900],
            inverted: colors.white,
          },
        },
        // dark mode
        'dark-tremor': {
          brand: {
            faint: '#111111',
            muted: colors.zinc[950],
            subtle: colors.zinc[800],
            DEFAULT: colors.zinc[500],
            emphasis: colors.zinc[400],
            inverted: colors.zinc[950],
          },
          background: {
            muted: '#111111',
            subtle: colors.zinc[800],
            DEFAULT: colors.zinc[900],
            emphasis: colors.zinc[300],
          },
          border: {
            DEFAULT: colors.zinc[800],
          },
          ring: {
            DEFAULT: colors.zinc[800],
          },
          content: {
            subtle: colors.zinc[600],
            DEFAULT: colors.zinc[500],
            emphasis: colors.zinc[200],
            strong: colors.zinc[50],
            inverted: colors.zinc[950],
          },
        },
      },
      boxShadow: {
        // light
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        // dark
        'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'dark-tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'dark-tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'tremor-small': '0.375rem',
        'tremor-default': '0.5rem',
        'tremor-full': '9999px',
      },
      fontSize: {
        'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};