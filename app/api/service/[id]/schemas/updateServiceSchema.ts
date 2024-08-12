import { z } from 'zod'

const updateServiceSchema = z.object({
  name: z.string().trim().toLowerCase().min(1).max(255).optional(),
  description: z.string().trim().toLowerCase().nullish(),
  isPublished: z.boolean().optional(),
  serviceImages: z.array(z.string().url()).nullish(),
})

type UpdateServiceSchema = z.infer<typeof updateServiceSchema>

export { updateServiceSchema }
export type { UpdateServiceSchema }
