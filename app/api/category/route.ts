import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { getCategoryList, createCategory } from './controllers'

const GET = handler(getCategoryList)

const POST = handler(verifySession, createCategory)

export { GET, POST }
