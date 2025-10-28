import { api } from '@/lib/axios'
import type { User } from '@/models/user'
import type { UpdateProfileSchema } from '@/schemas/auth/update-profile-schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface UpdateProfileResponse {
  message: string
  user: User
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateProfileSchema) => {
      const response = await api.patch<UpdateProfileResponse>(
        '/users/profile',
        data
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile']
      })
    }
  })
}
