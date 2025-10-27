import { Link, useLocation } from 'react-router'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../ui/sidebar'
import { Home, User } from 'lucide-react'

const items = [
  {
    title: 'Início',
    href: '/',
    icon: Home
  },
  {
    title: 'Perfil',
    href: '/profile',
    icon: User
  }
]

export function SidebarAppContent() {
  const location = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                // isActive={location.pathname === item.href}
                className={
                  location.pathname === item.href
                    ? 'bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }
              >
                <Link to={item.href}>
                  <item.icon />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
