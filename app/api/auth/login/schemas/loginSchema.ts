import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6).max(255),
})

type LoginSchema = z.infer<typeof loginSchema>

export { loginSchema }
export type { LoginSchema }
