import { PRODUCT_STATUS } from '@prisma/client'
import { z } from 'zod'

const createProductSchema = z.object({
  categoryId: z.string().trim().nullish(),
  name: z.string().trim().toLowerCase().min(1).max(255),
  description: z.string().trim().toLowerCase().nullish(),
  status: z.enum([PRODUCT_STATUS.AVAILABLE, PRODUCT_STATUS.UNAVAILABLE]),
  price: z.bigint().positive().nullish(),
  quantity: z.number().int().positive().nullish(),
  unit: z.string().trim().toLowerCase().min(1).max(20).nullish(),
  isPublished: z.boolean(),
  productImages: z.array(z.string().url()).nullish(),
})

type CreateProductSchema = z.infer<typeof createProductSchema>

export { createProductSchema }
export type { CreateProductSchema }
