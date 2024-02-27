import { z } from 'zod'

const updateCategorySchema = z.object({
  name: z.string().trim().toLowerCase().min(1).max(255).optional(),
  description: z.string().trim().toLowerCase().nullish(),
  isPublished: z.boolean().optional(),
})

type UpdateCategorySchema = z.infer<typeof updateCategorySchema>

export { updateCategorySchema }
export type { UpdateCategorySchema }
