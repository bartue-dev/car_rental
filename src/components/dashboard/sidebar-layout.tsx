import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "./app-sidebar"
import type { ReactNode } from "react"

export default function SidebarLayout({ children } : {children: ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="flex-1 flex flex-col min-h-screen">
        <SidebarTrigger/>
        <div className="flex-1 p-4 w-full h-full min-h-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}