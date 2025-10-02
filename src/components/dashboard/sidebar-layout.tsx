import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "./app-sidebar"
import type { ReactNode } from "react"

export default function SidebarLayout({ children } : {children: ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="flex-1">
        <SidebarTrigger/>
        <div className="flex-1 p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}