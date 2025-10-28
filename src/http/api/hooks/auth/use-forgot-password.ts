import { api } from '@/lib/axios'
import type { ForgotPasswordSchema } from '@/schemas/auth/forgot-password-schema'
import { useMutation } from '@tanstack/react-query'

interface ForgotPasswordResponse {
  message: string
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (data: ForgotPasswordSchema) => {
      const response = await api.post<ForgotPasswordResponse>(
        '/auth/forgot-password',
        data
      )
      return response.data
    }
  })
}
