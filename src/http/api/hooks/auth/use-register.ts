import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { User } from '@/models/user'
import type { RegisterSchema } from '@/schemas/auth/register-schema'

export interface RegisterResponse {
  message: string
  user: User
  token: string
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const response = await api.post<RegisterResponse>('/auth/register', data)
      return response.data
    }
  })
}
