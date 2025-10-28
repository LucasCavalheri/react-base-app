import { api } from '@/lib/axios'
import type { ResetPasswordSchema } from '@/schemas/auth/reset-password-schema'
import { useMutation } from '@tanstack/react-query'

export interface ResetPasswordResponse {
  message: string
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (data: ResetPasswordSchema) => {
      const response = await api.post<ResetPasswordResponse>(
        '/auth/reset-password',
        data
      )
      return response.data
    }
  })
}
