import { Car, ClipboardCheck, MessageCircle  } from 'lucide-react';
import useAxiosPrivate from '@/hooks/common/use-axios-private';
import { useQuery } from '@tanstack/react-query';
import type { SummaryDataTypes } from '@/lib/types';

export default function DataSummary() {
  const axiosPrivate = useAxiosPrivate();

  //summaryData useQuery
  const {
    data: summaryData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["summaryData"],
    queryFn: async () : Promise<SummaryDataTypes> => {
      const [vehicles, bookings, testimonials] = await Promise.all([
        axiosPrivate.get("/v1/vehicle-admin"),
        axiosPrivate.get("/v1/booking-admin"),
        axiosPrivate.get("/v1/testimonials-admin"),
      ]) 
      
        const items = {
          vehicles: vehicles?.data?.data?.totalItems,
          bookings: bookings?.data?.data?.totalItems,
          testimonials: testimonials?.data?.data?.totalItems,
        }

        return items;
    }
  })

  //if summaryData failed
  if (isError) {
    return (
      <div>
        {error.message}
      </div>
    )
  }

  return (
    <div>
      <h1 className="ml-1 mb-2 text-sm">Data Summary</h1>
      {isLoading
        ? <p>Retrieving weekly summary data. Please wait....</p>
        : <div className="flex  justify-between items-center gap-5">
            <div className="bg-white border rounded-sm w-full p-3 md:p-5 flex items-center gap-5 shadow-xs">
              <Car 
                strokeWidth={1}
                className="w-7 h-7"
              />
              <div>
                <h1 className="text-xs lg:text-sm">Total Vehicles</h1>
                <p className="text-xl">{summaryData?.vehicles}</p>
              </div>
            </div>
            <div className="bg-white border rounded-sm w-full p-3 md:p-5 flex items-center gap-5 shadow-xs">
              <ClipboardCheck 
                strokeWidth={1}
                className="w-7 h-7"
              />
              <div>
                <h1 className="text-xs lg:text-sm">Total Bookings</h1>
                <p className="text-xl">{summaryData?.bookings}</p>
              </div>
            </div>
            <div className="bg-white border rounded-sm w-full p-3 md:p-5 flex items-center gap-5 shadow-xs">
              <MessageCircle 
                strokeWidth={1}
                className="w-7 h-7"
              />
              <div>
                <h1 className="text-xs lg:text-sm">Total testimonials</h1>
                <p className="text-xl">{summaryData?.testimonials}</p>
              </div>
            </div>
          </div>}
      
    </div>
  )
}