import { useAuth } from '@/contexts/auth-context'
import { Loader2 } from 'lucide-react'
import { Navigate, Outlet } from 'react-router'

export function AuthLayout() {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (isAuthenticated || user) {
    return <Navigate to="/" />
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Outlet />
      </div>
    </div>
  )
}
