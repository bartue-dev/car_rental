import VehicleForm from "./vehicleForm";
import { ArrowLeftToLine } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function AddVehicle() {
  const navigate = useNavigate();

  return (
    <div className="">
      <ArrowLeftToLine
        color="#4b5563" 
        className="col-span-2 cursor-pointer mb-4"
        onClick={() => navigate("/dashboard/admin/vehicles")}
      />
      <VehicleForm/>
    </div>
  )
}

export default AddVehicle;