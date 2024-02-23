import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const verifySession = async (userId: string): Promise<boolean> => {
  const session = await getServerSession(authOptions)

  if (!session || session.user.id !== userId) {
    return Promise.resolve(false)
  }

  return Promise.resolve(true)
}

export default verifySession
