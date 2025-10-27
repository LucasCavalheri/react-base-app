import { useAuth } from '@/contexts/auth-context'
import { Navigate, Outlet } from 'react-router'

export function AuthLayout() {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated || user) {
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-dvh grid place-items-center bg-background">
      <div className="w-full max-w-[420px] px-4">
        <Outlet />
      </div>
    </div>
  )
}
