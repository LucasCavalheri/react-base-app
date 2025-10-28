import { api } from '@/lib/axios'
import type { CreateSubscriptionSchema } from '@/schemas/subscription/create-subscription-schema'
import { useMutation } from '@tanstack/react-query'

export interface CreateSubscriptionResponse {
  message: string
  data: {
    url: string
  }
}

export function useCreateSubscription() {
  return useMutation({
    mutationFn: async (data: CreateSubscriptionSchema) => {
      const response = await api.post<CreateSubscriptionResponse>(
        '/subscription/create-payment',
        data
      )

      return response.data
    }
  })
}
