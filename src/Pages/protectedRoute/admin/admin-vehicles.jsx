import Vehicles from "@/components/dashboard/vehiclesComponents/vehicles";
import { ClipboardPlus } from 'lucide-react';


function AdminVehicles() {

  return(
    <div>
       <div className="mb-5">
        <h1 className="text-sm">Quick Actions</h1>
        <div className="flex justify-between items-center gap-5 mt-2">
          <div className="border rounded-sm w-60 h-20 p-5 flex items-center gap-5 shadow-xs cursor-pointer">
            <ClipboardPlus size={35} strokeWidth={1}/>
            <div>
              <h1 className="text-sm">Add Vehicle</h1>
            </div>
          </div>
        </div>
      </div>
      <Vehicles/>
    </div>
  )
}

export default AdminVehicles;