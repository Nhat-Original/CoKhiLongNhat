import { handler } from '@/middlewares/handler'
import { getMe } from './controllers'
import verifySession from '@/middlewares/verifySession'

const GET = handler(verifySession, getMe)

export { GET }
