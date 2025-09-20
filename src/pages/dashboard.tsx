import SidebarLayout from "@/components/dashboard/sidebar-layout";
import { Outlet } from "react-router-dom";

function Dashboard() {
  
  return (
    <SidebarLayout>
      <div>
        <Outlet/>
      </div>
    </SidebarLayout>
  )
}

export default Dashboard;