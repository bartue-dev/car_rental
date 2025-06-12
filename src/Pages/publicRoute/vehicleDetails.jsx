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
    <div className="flex justify-between items-center px-18 ">
      { vehicleDetails
          && (
            <div className="bg-white w-130 h-full gap-5 flex flex-col items-center shadow-xl rounded-md py-5">
              <div className=" w-120 h-80 bg-base-300 rounded-md">
                <img src={vehicleDetails.images[0].url} alt="car" className="w-full h-full object-contain" />
              </div>
              <div className="flex justify-center items-center gap-40 w-full text-md">
                <div className="flex flex-col justify-between items-start gap-2">
                  <h1>Name: <span className="ml-2">{vehicleDetails.name}</span></h1>
                  <h1>Type: <span className="ml-2">{vehicleDetails.type}</span></h1>
                </div>
                <div className="flex flex-col justify-between items-start gap-2">
                  <h1>Status: <span className="ml-2">{vehicleDetails.status}</span></h1>
                  <h1>Price: <span className="ml-2">Php {vehicleDetails.price.toLocaleString()}</span></h1>
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