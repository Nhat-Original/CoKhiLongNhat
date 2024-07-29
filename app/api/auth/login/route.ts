import { handler } from '@/middlewares/handler'
import { login } from './controllers'

const POST = handler(login)

export { POST }
