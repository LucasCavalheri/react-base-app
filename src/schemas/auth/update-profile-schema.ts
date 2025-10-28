import z from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.email('Email inválido')
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
