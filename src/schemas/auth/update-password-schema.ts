import z from 'zod'

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Senha atual deve ter pelo menos 6 caracteres'),
    newPassword: z
      .string()
      .min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme a nova senha')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword']
  })

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
