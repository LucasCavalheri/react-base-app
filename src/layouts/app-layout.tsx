import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/auth-context'
import { Loader2 } from 'lucide-react'
import { Navigate, Outlet } from 'react-router'

export function AppLayout() {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex min-h-dvh">
      <SidebarProvider>
        <AppSidebar />
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
