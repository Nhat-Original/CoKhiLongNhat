import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { getProductById, updateProductById, removeProductById } from './controllers'

const GET = handler(verifySession, getProductById)

const PATCH = handler(verifySession, updateProductById)

const DELETE = handler(verifySession, removeProductById)

export { GET, PATCH, DELETE }
