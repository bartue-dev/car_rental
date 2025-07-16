import BookingForm from "./bookingForm";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLogout from "@/hooks/useLogout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftToLine } from 'lucide-react';
import { Toaster, toast } from "sonner";


function AddBooking() {
  const [vehicles, setVehicles] = useState([])
  const [vehicleId, setVehicleId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState()
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();

   useEffect(() => {
      const controller = new AbortController();
  
      const getVehicles = async () => {
        try {
          const response = await axiosPrivate.get("/v1/vehicle-admin", {signal: controller.signal});
  
          setVehicles(response?.data?.data?.vehicleDetails);
  
        } catch (error) {
  
          if (error?.code === "ERR_NETWORK") {
            setError(error?.message)
          } else if (error?.response?.status === 400) {
            setError(error?.response?.data?.message)
          } else if (error?.response?.status === 403) {
            await logout();
            navigate("/login")
          }
        } finally {
          setIsLoading(false)
        }
      }
  
      getVehicles();
  
      return () => controller.abort();
    }, [axiosPrivate])

  return (
    <div className="grid grid-cols-2 gap-4 relative">
      <Toaster position="top-center"/>
      <ArrowLeftToLine 
        color="#4b5563" 
        className="col-span-2 cursor-pointer"
        onClick={() => navigate("/dashboard/admin/bookings")}
      />
      {isLoading
        ? <p className="text-center italic">Retrieving vehicles. Please wait</p>
        : error
        ? <p className="text-center italic">{error}</p>
        : <div 
            className="flex flex-col gap-4 h-137 overflow-auto border p-2 rounded-md" style={{ scrollbarColor: "light-gray relative", scrollbarWidth: "thin"}}
          >
            <h1 className="absolute top-5 left-34 text-sm italic font-semibold">Please select one vehicle at a time</h1>
            {vehicles?.map((vehicle) => (
              <div key={vehicle.vehicleId} className="flex items-center shadow-sm">
                
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
                          {vehicle?.name.charAt(0).toUpperCase() + vehicle?.name.slice(1)}
                        </span>
                      </h1>
                      <h1 className="text-sm">
                        Type: {" "}
                        <span>
                          {vehicle?.type.charAt(0).toUpperCase() + vehicle?.type.slice(1)}
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
                          {vehicle?.price.toLocaleString()}
                        </span>
                      </h1>
                    </div>
                      {vehicle.status.toLowerCase() === "available"
                        ? <button 
                            className="border text-sm w-20 rounded-sm py-1 cursor-pointer bg-sky-600 text-white ml-2 mt-2"
                            onClick={() => {
                              setVehicleId(vehicle.vehicleId)
                              toast.success(`${vehicle.name} has been selected`)
                            }}
                          >
                            Select
                          </button>
                        : <button 
                            className="border text-sm w-20 rounded-sm py-1 bg-sky-600 text-white ml-2 mt-2 opacity-50"
                            disabled={true}
                          >
                            Select
                          </button>}
                  </div>
                </div>
              </div>
            ))}
          </div>}
      <BookingForm vehicleId={vehicleId} setVehicleId={setVehicleId}/>
    </div>
  )
}

export default AddBooking;