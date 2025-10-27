import { useAuth } from '@/contexts/auth-context'
import { Navigate, Outlet } from 'react-router'

export function AuthLayout() {
  const { isAuthenticated, user } = useAuth()

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
