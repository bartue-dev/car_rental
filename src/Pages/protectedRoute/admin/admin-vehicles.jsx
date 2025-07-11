import Vehicles from "@/components/dashboard/vehiclesComponents/vehicles";
import { ClipboardPlus } from 'lucide-react';
import { Link, Outlet, useLocation } from "react-router-dom";


function AdminVehicles() {
  const location = useLocation();

  const path = location.pathname.split("/").pop();

  return(
    <div>
      { path === "add-vehicle"
        ? <Outlet/>
        : <div>
            <div className="mb-5">
              <h1 className="text-sm">Quick Actions</h1>
              <div className="flex justify-between items-center gap-5 mt-2">
                <Link 
                  to="/dashboard/admin/vehicles/add-vehicle" 
                  className="border rounded-sm w-60 h-20 p-5 flex items-center gap-5 shadow-xs cursor-pointer"
                >
                  <ClipboardPlus size={35} strokeWidth={1}/>
                  <div>
                    <h1 className="text-sm">Add Vehicle</h1>
                  </div>
                </Link>
              </div>
            </div>
            <Vehicles/>
          </div>}
    </div>
  )
}

export default AdminVehicles;