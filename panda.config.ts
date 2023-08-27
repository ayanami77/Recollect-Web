import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          bgDefault: {
            value: "#F5F5F5"
          },
          bgWhite: {
            value: "#FFFFFF"
          },
          bgBlue: {
            value: "#0C4C97"
          },
          fontRed: {
            value: "#FD4444"
          },
          fontBlack: {
            value: "#000000"
          },
        },
      },
    },
  },
  // The output directory for your css system
  outdir: 'styled-system',
})
