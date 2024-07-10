import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { getProductBySimplifiedName } from './controllers'

const GET = handler(verifySession, getProductBySimplifiedName)

export { GET }
