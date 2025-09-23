import BookingForm from "./booking-form-admin";
import useVehiclesAdmin from "@/hooks/react-query/vehicles-query-admin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftToLine, CircleCheck } from 'lucide-react';
import { Toaster, toast } from "sonner";


export default function AddBookingAdmin() {
  const [vehicleId, setVehicleId] = useState("");
  const navigate = useNavigate();

  //vehicles admin useQuery
  const {
    vehicles,
    vehiclesIsLoading,
    vehiclesIsErr,
    vehiclesErr
  } = useVehiclesAdmin();

  useEffect(() => {
    console.log("VEHICLEID:", vehicleId)
  }, [vehicleId])


  //if vehicles useQuery failed
  if (vehiclesIsErr) {
    return (
      <div>
        {vehiclesErr?.message || "An unexpected error occured"}, at add booking admin
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 relative">
      <Toaster position="top-center"/>
      <ArrowLeftToLine 
        color="#4b5563" 
        className="col-span-2 cursor-pointer"
        onClick={() => navigate("/dashboard/admin/bookings")}
      />
      {vehiclesIsLoading
        ? <p className="text-center italic">Retrieving vehicles. Please wait</p>
        : <div 
            className="flex flex-col gap-4 h-137 overflow-auto border p-2 rounded-md bg-white" style={{ scrollbarColor: "light-gray relative", scrollbarWidth: "thin"}}
          >
            <h1 
              className="absolute top-5 left-34 text-sm italic font-semibold"
            >
              Please select one vehicle only 
              </h1>
              {vehicles?.map((vehicle) => (
                <div key={vehicle.vehicleId} className="flex items-center shadow-xs">
                  <div className="border rounded-sm rounded-r-none p-4 bg-base-300 w-65 h-40">
                    <img src={vehicle?.images[0]?.url} alt="car" className="w-full h-full object-contain"/>
                  </div>
                  <div 
                    className="border border-l-0 rounded-sm rounded-l-none h-40 w-full flex flex-col justify-center"
                  >
                    <div
                      className="flex flex-col ml-2 gap-5"
                    >
                      <div className="ml-2 grid grid-cols-2 gap-3">
                        <h1 className="text-sm">
                          Name: {" "}
                          <span>
                            {vehicle?.name && vehicle?.name?.charAt(0).toUpperCase() 
                            + vehicle?.name && vehicle?.name?.slice(1)}
                          </span>
                        </h1>
                        <h1 className="text-sm">
                          Type: {" "}
                          <span>
                            {vehicle?.type && vehicle?.type?.charAt(0).toUpperCase() 
                            + vehicle?.type && vehicle?.type?.slice(1)}
                          </span>
                        </h1>
                        <h1 className="text-sm">
                          <span className={`text-xs border-1 border-slate-400 rounded-xl w-fit px-3 py-1 flex justify-center items-center ${vehicle?.status === "Available" ? "bg-slate-200" : "bg-red-500 text-white border-none"}`}>
                            {vehicle?.status}
                          </span>
                        </h1>
                        <h1 className="text-sm">
                          Price: {" "}
                          <span>
                            {vehicle?.price?.toLocaleString()}
                          </span>
                        </h1>
                      </div>
                        {vehicle.status?.toLowerCase() === "available"
                          ? <button 
                              className="border text-sm w-28 rounded-sm py-1 cursor-pointer bg-sky-600 text-white ml-2 mt-2 px-3 tracking-wide"
                              onClick={() => {
                                setVehicleId(vehicle.vehicleId)
                                toast.success(`${vehicle.name} has been selected`)
                              }}
                            >
                              {vehicle.vehicleId === vehicleId
                                ? <span 
                                  className="flex items-center justify-between"
                                  >
                                    Selected <CircleCheck size={18}/>
                                  </span>
                                : <span>Select</span>}
                            </button>
                          : <button 
                              className="border text-sm w-28 rounded-sm py-1 bg-sky-600 text-white ml-2 mt-2 opacity-50 px-2 tracking-wide"
                              disabled={true}
                            >
                              Select
                            </button>}
                    </div>
                  </div>
                </div>
              ))}
          </div>}
        <BookingForm 
          vehicleId={vehicleId} 
          setVehicleId={setVehicleId}
        />
    </div>
  )
} 