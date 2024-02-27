import { handler } from '@/middlewares/handler'
import verifySession from '@/middlewares/verifySession'
import {
  getCategoryBySimplifiedName,
  updateCategoryBySimplifiedName,
  removeCategoryBySimplifiedName,
} from './controllers'

const GET = handler(verifySession, getCategoryBySimplifiedName)

const PATCH = handler(verifySession, updateCategoryBySimplifiedName)

const DELETE = handler(verifySession, removeCategoryBySimplifiedName)

export { GET, PATCH, DELETE }
