'use client'
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import FlowbiteProvider from './FlowbiteProvider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <FlowbiteProvider>{children}</FlowbiteProvider>
    </SessionProvider>
  )
}

export default Providers
