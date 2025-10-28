import { z } from 'zod'

export const createSubscriptionSchema = z.object({
  phone: z.string(),
  document: z.string()
})

export type CreateSubscriptionSchema = z.infer<typeof createSubscriptionSchema>
