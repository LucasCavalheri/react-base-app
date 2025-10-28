import { api } from '@/lib/axios'
import type { User } from '@/models/user'
import { useQuery } from '@tanstack/react-query'

export interface ProfileResponse {
  message: string
  user: User
}

export function useProfile() {
  const FIVE_MINUTES = 5 * 60 * 1000

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get<ProfileResponse>('/auth/profile')
      return response.data
    },
    retry: false,
    staleTime: FIVE_MINUTES
  })
}
