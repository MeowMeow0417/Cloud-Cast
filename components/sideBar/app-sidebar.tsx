import { Calendar, Home, Cloud , Settings } from "lucide-react"
import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}


export function AppSidebar() {
//     const {
//     state,
//     open,
//     setOpen,
//     openMobile,
//     setOpenMobile,
//     isMobile,
//     toggleSidebar,
//   } = useSidebar()

  return (
    <Sidebar variant="floating" collapsible="icon" side="left">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                    <a href="#">
                        <Cloud />
                        <span>Cloud Cast</span>
                    </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
      <SidebarContent>
        <SidebarTrigger />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />

      </SidebarFooter>
    </Sidebar>
  )
}