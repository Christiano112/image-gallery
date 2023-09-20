import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#543EE0",
        },
        secondary: {
          DEFAULT: "#FFEDCC",
        },
        tertiary: {
          DEFAULT: "#111111",
        },
      },
      screens: {
        xs: "480px",
        "2xs": "576px",
      },
      keyframes: {
        rotate180: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        }
      },
      animation: {
        rotate180: 'rotate180 300ms ease-in-out 1',
      },
    },
  },
  plugins: [],
}
export default config
