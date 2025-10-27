import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().max(255),
})

type LoginSchema = z.infer<typeof loginSchema>

export { loginSchema }
export type { LoginSchema }
