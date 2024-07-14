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
  button: {
    base: 'inline-flex focus:ring-transparent items-center justify-center font-medium rounded-lg focus:outline-none transition duration-150 ease-in-out disabled:opacity-50',
    color: {
      gray: 'text-gray-900 bg-white border border-gray-200 enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700',
      info: 'text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700',
      failure:
        'text-white bg-red-700 border border-transparent enabled:hover:bg-red-800 dark:bg-red-600 dark:enabled:hover:bg-red-700',
    },
  },
  checkbox: {
    root: {
      base: 'h-4 w-4 rounded focus:ring-transparent border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100',
      color: {
        cyan: 'text-cyan-600',
      },
    },
  },
}

const FlowbiteProvider = ({ children }: PropsWithChildren) => {
  return <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
}

export default FlowbiteProvider
