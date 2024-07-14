import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { createProductImage } from './controllers'

const POST = handler(verifySession, createProductImage)

export { POST }
