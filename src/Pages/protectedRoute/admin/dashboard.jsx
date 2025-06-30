import SidebarLayout from "@/components/dashboard/sidebarLayout";
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