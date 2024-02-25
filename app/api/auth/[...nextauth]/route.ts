import prisma from '@/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { ENV } from '@/utils/constant'
import { ROLE } from '@prisma/client'

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: ENV.GOOGLE_CLIENT_ID || '',
      clientSecret: ENV.GOOGLE_CLIENT_SECRET || '',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : ROLE.STANDARD,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as ROLE
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { authOptions }
export { handler as GET, handler as POST }
