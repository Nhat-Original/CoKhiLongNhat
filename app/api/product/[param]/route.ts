import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { getProductBySimplifiedName, updateProductBySimplifiedName, removeProductById } from './controllers'

const GET = handler(verifySession, getProductBySimplifiedName)

const PATCH = handler(verifySession, updateProductBySimplifiedName)

const DELETE = handler(verifySession, removeProductById)

export { GET, PATCH, DELETE }
