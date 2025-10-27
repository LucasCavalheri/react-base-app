import { useAuth } from '@/contexts/auth-context'
import { useGoogleLogin as useGoogleOAuth } from '@react-oauth/google'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

export function useGoogle() {
  const { googleOAuth } = useAuth()

  const googleLogin = useGoogleOAuth({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token
        if (!accessToken) return

        await googleOAuth.execute(accessToken)
        toast.success('Login realizado com sucesso')
      } catch (error) {
        if (isAxiosError(error)) {
          const description =
            error.response?.data?.message ||
            'Houve um erro ao fazer o login. Por favor, tente novamente.'

          toast.error('Erro ao fazer o login', { description })
        }
      }
    },
    onError: () => {
      toast.error('Erro ao fazer o login', {
        description:
          'Houve um erro ao fazer o login. Por favor, tente novamente.'
      })
    },
    flow: 'implicit'
  })

  return {
    execute: googleLogin,
    isPending: googleOAuth.isPending
  }
}
