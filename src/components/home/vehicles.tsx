import { useState } from "react"
import axios from "@/api/axios";
import { Button } from "@/components/ui/button"
import VehiclePagination from "./vehicle-pagination";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import type { GetAllVehiclesTypes } from "@/lib/types";

export default function Vehicles() {
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 1
  })
 
  //function to fetch the data from backend
  //pass as props for pagination component
  const getAllVehicle = async (page: number) : Promise<GetAllVehiclesTypes[]> => {
    //number of data to be fetch
    const ITEMS_PER_PAGE = 6
    
    //number of data to be skip
    const skip = (page - 1) * ITEMS_PER_PAGE

    const response = await axios.get(`/v1/vehicle-public?skip=${skip}&take=${ITEMS_PER_PAGE}`,{
      withCredentials: true,
    });

    //vehicle data
    // setVehicles(response.data.data.vehicleDetails)
    setPagination({
      currentPage: page, // current page
      totalPage: Math.ceil(response?.data?.data?.totalItems / ITEMS_PER_PAGE) //calculate the page number for pagination
    });

    return response?.data?.data?.vehicleDetails

  }

  //page
  const page = 1
  //react-query, useQuery
  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["vehicles", page],
    queryFn: () => getAllVehicle(page)
  }) 

  return (
    <div className="px-18 py-5">
      <h1 className="place-self-center text-4xl font-semibold ">VEHICLES</h1>
      <div className="grid grid-cols-3 gap-8 mt-10  place-items-center px-20 mb-8">
      {isLoading
        ? <p className="text-sm italic">Retrieving vehicles data. Please wait..</p>
        : vehicles.map(vehicle => {
          return (  
                /* card */
              <div 
                key={vehicle.vehicleId} 
                className="rounded-xl shadow-sm w-70 h-90 p-3 flex flex-col justify-between bg-base-100"
              >
                <div className="border rounded-sm bg-base-300 w-65 h-40 place-self-center">
                  <img src={vehicle?.images[0]?.url} alt="car" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-2xl break-words overflow-wrap-anywhere">
                  {vehicle.name}
                </h1>
                <h1 
                className={`text-xs border-1 border-slate-400 rounded-xl w-fit px-3 py-1 flex justify-center items-center ${vehicle?.status === "Available" ? "bg-slate-200" : "bg-red-500 text-white border-none"}`}
                >
                  {vehicle.status}  
                </h1>
                {/* pricing */}
                <div className="flex justify-between ">
                  <div>
                    <h1 className="text-sm underline">Price</h1>
                    <h1 className="">Php {vehicle?.price?.toLocaleString()}</h1>
                  </div>
                  {/* link to vehicleDetails */}
                  <div className="-row-span-2 flex flex-wrap items-center gap-2 md:flex-row">
                    {vehicle?.status?.toLowerCase() === "available"
                      ? <Link to={`/vehicle-details/${vehicle.vehicleId}`}>
                          <Button className="px-10 cursor-pointer">Book</Button>
                        </Link>
                      : <Button className="px-10" disabled>Book</Button>
                    }
                    
                  </div>
                </div>
              </div>
          )
        })}
      </div>
      <VehiclePagination
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPage}
        itemsRender={getAllVehicle}
      />
    </div>
  )
}