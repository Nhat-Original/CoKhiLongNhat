import { z } from 'zod'

const createServiceImageSchema = z.object({
  url: z.string().url(),
})

type CreateServiceImageSchema = z.infer<typeof createServiceImageSchema>

export { createServiceImageSchema }
export type { CreateServiceImageSchema }
