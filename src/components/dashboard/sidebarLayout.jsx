import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/sidebar"

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="flex-1 flex flex-col min-h-screen relative">
        <SidebarTrigger className="absolute -top-5"/>
        <div className="flex-1 p-4 w-full h-full min-h-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}