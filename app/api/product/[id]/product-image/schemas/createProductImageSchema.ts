import { z } from 'zod'

const createProductImageSchema = z.object({
  url: z.string().url(),
})

type CreateProductImageSchema = z.infer<typeof createProductImageSchema>

export { createProductImageSchema }
export type { CreateProductImageSchema }
