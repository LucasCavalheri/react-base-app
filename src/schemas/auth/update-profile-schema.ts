import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.email('Email inválido'),
  whatsapp: z.string().optional(),
  document: z.string().optional()
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
