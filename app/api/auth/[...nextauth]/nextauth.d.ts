import { DefaultSession } from 'next-auth'
import { ROLE } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: ROLE
    } & DefaultSession['user']
  }
}
