import type { UserProviders } from '@/types/user/user-providers'

export interface AuthAccounts {
  provider: UserProviders
  login: string
  email: string
  name: string
  image: string | null
}
