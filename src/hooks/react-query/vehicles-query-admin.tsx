import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../common/use-axios-private";
import type { GetAllVehiclesTypes } from "@/lib/types";

export default function useVehiclesAdmin() {
  const axiosPrivate = useAxiosPrivate()

   //vehicles useQuery
  const {
    data: vehicles = [],
    isLoading: vehiclesIsLoading,
    isError: vehiclesIsErr,
    error: vehiclesErr
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () : Promise<GetAllVehiclesTypes[]> => {
      const response = await axiosPrivate.get("/v1/vehicle-admin");
      return response.data.data.vehicleDetails
    }
  });

  return {
    vehicles,
    vehiclesIsLoading,
    vehiclesIsErr,
    vehiclesErr
  }
}