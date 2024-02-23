import type { Config as TailwindConfig } from 'tailwindcss'
import { Config as DaisyuiConfig } from 'daisyui'
import themes from 'daisyui/src/theming/themes'

const config: TailwindConfig = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['var(--font-lato)'],
        'abril-fatface': ['var(--font-abril-fatface)'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...themes.light,
          primary: '#E90064',
        },
      },
      {
        dark: {
          ...themes.dark,
          primary: '#E90064',
        },
      },
    ],
  } as DaisyuiConfig,
}

export default config
