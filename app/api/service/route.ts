import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { getServiceList, createService } from './controllers'

const GET = handler(getServiceList)

const POST = handler(verifySession, createService)

export { GET, POST }
