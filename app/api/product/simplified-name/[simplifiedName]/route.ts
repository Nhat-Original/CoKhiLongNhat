import { handler } from '@/middlewares/handler'
import { getProductBySimplifiedName } from './controllers'

const GET = handler(getProductBySimplifiedName)

export { GET }
