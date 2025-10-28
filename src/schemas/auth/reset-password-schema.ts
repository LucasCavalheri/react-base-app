import { z } from 'zod'

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'Senha inválida'),
  identifier: z.string().min(6, 'Identificador inválido'),
  otp: z.string().min(6, 'Código inválido')
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
