import { z } from 'zod'

const createCategorySchema = z.object({
  name: z.string().trim().toLowerCase().min(1).max(255),
  description: z.string().trim().toLowerCase().nullish(),
  isPublished: z.boolean(),
})

type CreateCategorySchema = z.infer<typeof createCategorySchema>

export { createCategorySchema }
export type { CreateCategorySchema }
