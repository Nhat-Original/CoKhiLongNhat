import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { getServiceById, updateServiceById, removeServiceById } from './controllers'

const GET = handler(getServiceById)

const PATCH = handler(verifySession, updateServiceById)

const DELETE = handler(verifySession, removeServiceById)

export { GET, PATCH, DELETE }
