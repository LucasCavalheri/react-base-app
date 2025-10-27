import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { User } from '@/models/user'
import type { LoginSchema } from '@/schemas/auth/login-schema'

export interface LoginResponse {
  message: string
  user: User
  token: string
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await api.post<LoginResponse>('/auth/login', data)
      return response.data
    }
  })
}
