import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/auth-context'
import { Navigate, Outlet } from 'react-router'

export function AppLayout() {
  const { isAuthenticated, user, logout } = useAuth()

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex min-h-dvh">
      <SidebarProvider>
        <AppSidebar user={user} logout={logout} />
        <main className="flex-1">
          <SidebarTrigger />
          <div className="ml-5 md:ml-10">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}
