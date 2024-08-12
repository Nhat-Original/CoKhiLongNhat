import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { removeServiceImage } from './controllers'

const DELETE = handler(verifySession, removeServiceImage)

export { DELETE }
