import { Car, ClipboardCheck, MessageCircle  } from 'lucide-react';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

function WeeklySummary() {
  const [data, setData] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const getVehicle = async () => {
      try {
        const vehicles = await axiosPrivate("/v1/vehicle-admin", {signal: controller.signal});
        const bookings = await axiosPrivate("/v1/booking-admin", {signal: controller.signa});
        const testimonials = await axiosPrivate("/v1/testimonials-admin", {signal: controller.signa});

        const items = {
          vehicles: vehicles?.data?.data?.totalItems,
          bookings: bookings?.data?.data?.totalItems,
          testimonials: testimonials?.data?.data?.totalItems,
        }

        setData(items);


      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
      
    }

    getVehicle();

    return () => controller.abort();
    
  },[axiosPrivate])


  return (
    <div>
      <h1 className="ml-1 mb-2 text-sm">Weekly Summary</h1>
      {isLoading
        ? <p>Retrieving weekly summary data. Please wait....</p>
        : <div className="flex justify-between items-center gap-5">
            <div className="border rounded-sm w-full p-5 flex items-center gap-5 shadow-xs">
              <Car size={45} strokeWidth={1}/>
              <div>
                <h1 className="text-sm">Total Vehicles</h1>
                <p className="text-xl">{data.vehicles}</p>
              </div>
            </div>
            <div className="border rounded-sm w-full p-5 flex items-center gap-5 shadow-xs">
              <ClipboardCheck size={30} strokeWidth={1}/>
              <div>
                <h1 className="text-sm">Total Bookings</h1>
                <p className="text-xl">{data.bookings}</p>
              </div>
            </div>
            <div className="border rounded-sm w-full p-5 flex items-center gap-5 shadow-xs">
              <MessageCircle size={30} strokeWidth={1}/>
              <div>
                <h1 className="text-sm">Total testimonials</h1>
                <p className="text-xl">{data.testimonials}</p>
              </div>
            </div>
          </div>}
      
    </div>
  )
}

export default WeeklySummary