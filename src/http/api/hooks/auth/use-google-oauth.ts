import { api } from '@/lib/axios'
import type { User } from '@/models/user'
import { useMutation } from '@tanstack/react-query'

export interface GoogleOAuthResponse {
  message: string
  user: User
  token: string
}

export function useGoogleOAuth() {
  return useMutation({
    mutationFn: async (accessToken: string) => {
      const response = await api.post<GoogleOAuthResponse>(
        '/auth/google-oauth',
        {
          credential: accessToken
        }
      )

      return response.data
    }
  })
}
