import { handler } from '@/middlewares/handler'
import { pingDatabase } from './controllers'

const GET = handler(pingDatabase)

export { GET }
