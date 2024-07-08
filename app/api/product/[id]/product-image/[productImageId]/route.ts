import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { removeProductImage } from './controllers'

const DELETE = handler(verifySession, removeProductImage)

export { DELETE }
