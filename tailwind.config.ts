import type { Config as TailwindConfig } from 'tailwindcss'

const config: TailwindConfig = {
  content: [
    './node_modules/flowbite-react/lib/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('flowbite/plugin')],
  theme: {},
}

export default config
