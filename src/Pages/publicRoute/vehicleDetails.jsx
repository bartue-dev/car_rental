import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/api/axios";
import BookingForm from "@/components/bookingForm";


function VehicleDetails() {
  const { vehicleId } = useParams();
  const [vehicleDetails, setVehicleDetails] = useState();

  useEffect(() => {
    const controller = new AbortController();

    const getVehicle = async () => {

      try {
        const response = await axios.get(`/v1/vehicle-public/${vehicleId}`, {
          withCredentials: true,
          signal: controller.signal
        });

        console.log("Vehicle details:",response)
        setVehicleDetails(response.data.data.vehicleDetails)
      } catch (error) { 
        console.error(error)
      }

    }

    getVehicle();

    return () => controller.abort();

  },[vehicleId])

  return (
    <div className="flex justify-between px-18 ">
      { vehicleDetails
          && (
            <div className="bg-white w-[32rem] h-full p-6 rounded-xl shadow-xl flex flex-col gap-6">
              {/* Vehicle Image */}
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={vehicleDetails.images[0].url}
                  alt="car"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Vehicle Info */}
              <div className="grid grid-cols-2 gap-6 w-full text-sm sm:text-base">
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="font-semibold text-gray-600">Name:</span>
                    <span className="ml-2 text-gray-800">{vehicleDetails.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Type:</span>
                    <span className="ml-2 text-gray-800">{vehicleDetails.type}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <span className="font-semibold text-gray-600">Status:</span>
                    <span
                      className={`ml-2 font-medium ${
                        vehicleDetails.status.toLowerCase() === "available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {vehicleDetails.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Price:</span>
                    <span className="ml-2 text-gray-800">
                      Php {vehicleDetails.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          )
        }
        <div className="w-1/2 h-full">
          <BookingForm />
        </div>
    </div>
  )
}

export default VehicleDetails;