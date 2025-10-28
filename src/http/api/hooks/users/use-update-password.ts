import { api } from '@/lib/axios'
import type { UpdatePasswordSchema } from '@/schemas/auth/update-password-schema'
import { useMutation } from '@tanstack/react-query'

interface UpdatePasswordResponse {
  message: string
}

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (data: UpdatePasswordSchema) => {
      const response = await api.patch<UpdatePasswordResponse>(
        '/users/profile/password',
        data
      )
      return response.data
    }
  })
}
