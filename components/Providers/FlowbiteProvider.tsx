import type { CustomFlowbiteTheme } from 'flowbite-react'
import { Flowbite } from 'flowbite-react'
import { PropsWithChildren } from 'react'

const customTheme: CustomFlowbiteTheme = {
  navbar: {
    root: {
      base: 'bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 sticky top-0',
    },
    toggle: {
      base: 'inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 md:hidden',
    },
  },
}

const FlowbiteProvider = ({ children }: PropsWithChildren) => {
  return <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
}

export default FlowbiteProvider
