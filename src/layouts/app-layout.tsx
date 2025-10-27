import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div>
      sidebar
      <Outlet />
    </div>
  )
}
