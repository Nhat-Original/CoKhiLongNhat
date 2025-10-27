import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { createServiceImage } from './controllers'

const POST = handler(verifySession, createServiceImage)

export { POST }
