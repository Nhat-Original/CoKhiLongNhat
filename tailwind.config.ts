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
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [],
  } as DaisyuiConfig,
}

export default config
