import { api } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

export interface LogoutResponse {
  message: string
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.delete<LogoutResponse>('/auth/logout')
      return response.data
    }
  })
}
