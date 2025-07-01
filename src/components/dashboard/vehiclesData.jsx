import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { ClipboardPlus } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";

function VehiclesData() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();

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

      {isLoading
        ? <p className="italic text-center">Retrieving vehicles data. Please wait!</p>
        : error
        ? <p className="italic text-center">Sorry unable to retrieve vehicles data.</p>
        : <div className="grid grid-cols-2 gap-4">
            {vehicles?.map((vehicle) => (
              <div key={vehicle.vehicleId} className="flex items-center">
                <div className="border rounded-sm rounded-r-none p-4 bg-base-300 w-65 h-40">
                  <img src={vehicle?.images[0].url} alt="car" className="w-full h-full object-contain"/>
                </div>
                <div 
                  className="border border-l-0 rounded-sm rounded-l-none h-full w-full flex flex-col justify-center"
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
                    <div className="flex items-center gap-3 mt-3">
                        <button 
                          className="outline-none border-1 py-1 cursor-pointer text-gray-700 text-xs border-gray-400 rounded-2xl w-30"
                          >
                            Update
                        </button>
                        <button 
                          className="outline-none border-1 py-1 cursor-pointer bg-red-600 text-xs rounded-2xl w-30 text-stone-100"
                        >
                          Delete
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>}
    </div>
  )
}

export default VehiclesData;