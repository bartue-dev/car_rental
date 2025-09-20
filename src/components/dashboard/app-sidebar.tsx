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
import useLogout from "@/hooks/use-logout"

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

export default function AppSidebar() {
  const logout = useLogout();
  const navigate = useNavigate()
  const location = useLocation();

  const path = location?.pathname

  const handleLogout = async () => {
    await logout();
    navigate("/login")
  }

  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <SidebarGroup className="border-b">
          <SidebarHeader 
            className="tracking-widest w-full border-b p-4"
          >
            ADMIN PANEL
          </SidebarHeader>
          <SidebarGroupContent className="p-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mt-2">
                  <SidebarMenuButton asChild 
                    className={path === item.url ? "bg-base-300" : ""} >
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
          <SidebarFooter className="px-4 bg-white border-t">
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