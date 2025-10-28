import z from 'zod'

export const forgotPasswordSchema = z.object({
  method: z.enum(['email', 'whatsapp']),
  identifier: z.string()
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
