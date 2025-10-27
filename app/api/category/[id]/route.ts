import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import { getCategoryById, updateCategoryById, removeCategoryById } from './controllers'

const GET = handler(getCategoryById)

const PATCH = handler(verifySession, updateCategoryById)

const DELETE = handler(verifySession, removeCategoryById)

export { GET, PATCH, DELETE }
