import type { UserPlan } from '@/types/user/user-plan'

export interface User {
  id: string
  name: string
  email: string
  plan: UserPlan
}
