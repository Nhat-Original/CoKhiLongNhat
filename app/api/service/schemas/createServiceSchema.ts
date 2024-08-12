import { z } from 'zod'

const createServiceSchema = z.object({
  name: z.string().trim().toLowerCase().min(1).max(255),
  description: z.string().trim().toLowerCase().nullish(),
  isPublished: z.boolean(),
  serviceImages: z.array(z.string().url()).nullish(),
})

type CreateServiceSchema = z.infer<typeof createServiceSchema>

export { createServiceSchema }
export type { CreateServiceSchema }
