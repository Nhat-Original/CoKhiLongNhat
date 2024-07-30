import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'

type Payload = {
  id: number
  email: string
  role: string
  image: string | null
  name: string | null
}

const useAuth = () => {
  const { data: session, status: sessionStatus } = useSession()

  const query = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await fetch(`${ENV.API_URL}/auth/me`)
      return (await response.json()).data
    },
  })
  const payload = (query.data as Payload) || null

  return {
    isAuth: payload || session?.user,
    user: payload ? payload : session?.user ? session.user : null,
    sessionStatus,
  }
}

export default useAuth
