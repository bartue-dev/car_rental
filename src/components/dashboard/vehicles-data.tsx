import EditVehicleDialog from "./edit-vehicle-dialog";
import useAxiosPrivate from "@/hooks/common/use-axios-private";
import useVehiclesAdmin from "@/hooks/react-query/vehicles-query-admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function VehiclesData() {
  // const [vehicles, setVehicles] = useState([]);
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient()

  const {
    vehicles,
    vehiclesIsLoading,
    vehiclesIsErr,
    vehiclesErr
  } = useVehiclesAdmin();

  const {
    mutate: deleteVehicle
  } = useMutation({
    mutationFn: async (vehicleId: string) => {
      const [vehicles, vehiclesImages] = await Promise.all([
        await axiosPrivate.delete(`/v1/vehicle-admin/${vehicleId}`),
        await axiosPrivate.delete(`/v1/images-admin/vehicle/${vehicleId}`)
      ])

      return {
        vehicles,
        vehiclesImages
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["vehicles"]})
    },
  })


  const handleDeleteVehicle = (vehicleId : string) => {
    deleteVehicle(vehicleId)
  }

  if (vehiclesIsErr) {
    return (
      <div>
        {vehiclesErr?.message || "An unexpected error occured!"}
      </div>
    )
  }

  return (
    <div>
      {vehiclesIsLoading
        ? <p className="italic text-center">Retrieving vehicles data. Please wait!</p>
        : <div className="grid grid-cols-2 gap-4">
          {vehicles?.map((vehicle) => (
            <div key={vehicle.vehicleId} className="flex items-center bg-white">
              <div className="border rounded-sm rounded-r-none p-4 bg-base-300 w-65 h-40">
                <img src={vehicle?.images[0]?.url} alt="car" className="w-full h-full object-contain"/>
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
                        {vehicle?.name 
                          && vehicle?.name.charAt(0).toUpperCase() 
                          + vehicle?.name.slice(1)}
                      </span>
                    </h1>
                    <h1 className="text-sm">
                      Type: {" "}
                      <span>
                        {vehicle?.type 
                          && vehicle?.type.charAt(0).toUpperCase() 
                          + vehicle?.type.slice(1)}
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
                  <div className="flex items-center gap-3 mt-3">
                      <button 
                        className="outline-none border-1 py-1 cursor-pointer text-gray-700 text-xs border-gray-400 rounded-2xl w-30"
                        >
                          <EditVehicleDialog
                            {...vehicle}
                          />
                      </button>
                      <button 
                        className="outline-none border-1 py-1 cursor-pointer bg-red-600 text-xs rounded-2xl w-30 text-stone-100"
                        onClick={() => handleDeleteVehicle(vehicle.vehicleId)}
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