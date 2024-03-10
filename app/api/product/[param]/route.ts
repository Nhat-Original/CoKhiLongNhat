import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { getProductBySimplifiedName, updateProductBySimplifiedName, removeProductBySimplifiedName } from './controllers'

const GET = handler(verifySession, getProductBySimplifiedName)

const PATCH = handler(verifySession, updateProductBySimplifiedName)

const DELETE = handler(verifySession, removeProductBySimplifiedName)

export { GET, PATCH, DELETE }
