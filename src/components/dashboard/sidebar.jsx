import { Calendar, Home, Inbox,  MessageCircle, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

import { Link, useLocation, useNavigate } from "react-router-dom"
import useLogout from "@/hooks/useLogout"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard/main",
    icon: Home,
  },
  {
    title: "Bookings",
    url: "/dashboard/admin/bookings",
    icon: Inbox,
  },
  {
    title: "Vehicles",
    url: "/dashboard/admin/vehicles",
    icon: Calendar,
  },
  {
    title: "Testimonials",
    url: "/dashboard/admin/testimonials",
    icon: MessageCircle
  }
]

export function AppSidebar() {
  const logout = useLogout();
  const navigate = useNavigate
  const location = useLocation();

  const path = location?.pathname

  const handleLogout = async () => {
    await logout();
    navigate("/login")
  }

  return (
    <Sidebar>
      <SidebarContent className="px-2">
        <SidebarGroup className="border-b">
          <SidebarHeader>Admin Panel</SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mt-2">
                  <SidebarMenuButton asChild className={path === item.url && "bg-base-300"} >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
          <SidebarFooter className="px-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className="cursor-pointer"
                    onClick={handleLogout}
                    >
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
    </Sidebar>
  )
}