import { api } from '@/lib/axios'
import type { User } from '@/models/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface GoogleOAuthResponse {
  message: string
  user: User
  token: string
}

export function useGoogleOAuth() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (accessToken: string) => {
      const response = await api.post<GoogleOAuthResponse>(
        '/auth/google-oauth',
        {
          credential: accessToken
        }
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}
