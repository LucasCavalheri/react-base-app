import type { UserPlan } from '@/types/user/user-plan'
import type { AuthAccounts } from './auth-accounts'

export interface User {
  id: string
  name: string
  email: string
  plan: UserPlan
  authAccounts: AuthAccounts[]
}
