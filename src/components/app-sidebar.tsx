import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator
} from './ui/sidebar'
import { SidebarAppHeader } from './sidebar/sidebar-app-header'
import { SidebarAppContent } from './sidebar/sidebar-app-content'
import { SidebarAppFooter } from './sidebar/sidebar-app-footer'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarAppHeader />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarAppContent />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="flex flex-col">
        <SidebarAppFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
