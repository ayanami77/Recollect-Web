import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './pages/**/*.{js,jsx,ts,tsx}',
    "./stories/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          lightGray: {
            value: '#F5F5F5',
          },
          gray: {
            value: '#E0E0E0',
          },
          white: {
            value: '#FFFFFF',
          },
          dimBlue: {
            value: '#0C4C97',
          },
          dimGray: {
            value: '#0000009c',
          },
          modestGray: {
            value: '#A0A0A0',
          },
          cinnabar: {
            value: '#FD4444',
          },
          skyBlue: {
            value: '#1578c0',
          },
          black: {
            value: '#000000',
          },
          lightGreen: {
            value: '#0C976D',
          },
          dullBlue: {
            value: '#0c4c9742',
          },
          logoRed: {
            value: '#FD4444',
          },
        },
      },
    },
  },
  // The output directory for your css system
  outdir: 'styled-system',
})
