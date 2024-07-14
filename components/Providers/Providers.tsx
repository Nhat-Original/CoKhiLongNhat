'use client'
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import FlowbiteProvider from './FlowbiteProvider'
import QueryProvider from './QueryProvider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <QueryProvider>
        <FlowbiteProvider>{children}</FlowbiteProvider>
      </QueryProvider>
    </SessionProvider>
  )
}

export default Providers
