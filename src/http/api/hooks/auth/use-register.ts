import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { User } from '@/models/user'
import type { RegisterSchema } from '@/schemas/auth/register-schema'

export interface RegisterResponse {
  message: string
  user: User
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const response = await api.post<RegisterResponse>('/auth/register', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}
