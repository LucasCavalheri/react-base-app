import { z } from 'zod'
import { validateBrazilianCellphone } from '@/utils/validate-brazilian-cellphone'
import { validateCpfCnpj } from '@/utils/validate-cnf-cnpj'

export const createSubscriptionSchema = z.object({
  phone: z.string().refine((value) => validateBrazilianCellphone(value), {
    error: 'Telefone inválido'
  }),
  document: z.string().refine((value) => validateCpfCnpj(value), {
    error: 'CPF/CNPJ inválido'
  })
})

export type CreateSubscriptionSchema = z.infer<typeof createSubscriptionSchema>
