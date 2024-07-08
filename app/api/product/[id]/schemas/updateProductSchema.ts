import { PRODUCT_STATUS } from '@prisma/client'
import { z } from 'zod'

const updateProductSchema = z.object({
  categoryId: z.string().trim().cuid().nullish(),
  name: z.string().trim().toLowerCase().min(1).max(255).optional(),
  description: z.string().trim().toLowerCase().nullish(),
  status: z.enum([PRODUCT_STATUS.AVAILABLE, PRODUCT_STATUS.UNAVAILABLE]).optional(),
  price: z.number().int().positive().nullish(),
  quantity: z.number().int().positive().nullish(),
  unit: z.string().trim().toLowerCase().min(1).max(20).nullish(),
  isPublished: z.boolean().optional(),
  productImages: z.array(z.string().url()).nullish(),
})

type UpdateProductSchema = z.infer<typeof updateProductSchema>

export { updateProductSchema }
export type { UpdateProductSchema }
