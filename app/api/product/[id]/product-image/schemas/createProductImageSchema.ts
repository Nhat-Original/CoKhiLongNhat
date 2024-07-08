import { z } from 'zod'

const createProducImageSchema = z.object({
  url: z.string().url(),
})

type CreateProductImageSchema = z.infer<typeof createProducImageSchema>

export { createProducImageSchema }
export type { CreateProductImageSchema }
