import { useParams } from "react-router-dom";
import axios from "@/api/axios";
import BookingForm from "./booking-form";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

export default function VehicleDetails() {
  const { vehicleId } = useParams();

  const {data: vehicleDetails = [], isLoading} = useQuery({
    queryKey: ["vehiclesDetails"],
    queryFn: async () => {
      const response = await axios.get(`/v1/vehicle-public/${vehicleId}`, {withCredentials: true});

      return response?.data?.data?.vehicleDetails
    }
  });

  return (
    <div className="flex justify-between px-18 py-5">
      { isLoading
          ? <LoaderCircle className="animate-spin"/>
          : (
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
          <BookingForm {...vehicleDetails}/>
        </div>
    </div>
  )
}