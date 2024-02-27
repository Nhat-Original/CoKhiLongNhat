import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { getProductList, createProduct } from './controllers'

const GET = handler(verifySession, getProductList)

const POST = handler(verifySession, createProduct)

export { GET, POST }
