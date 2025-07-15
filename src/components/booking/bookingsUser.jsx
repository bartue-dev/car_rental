import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react"

import { SquareUser,
    MapPin,
    Phone,
    Calendar1,
    CircleCheck,
    CircleX,
    CircleEllipsis,
    CarFront,
    HandCoins
} from 'lucide-react';

import { Button } from "../ui/button";

function BookingsUser() {
  const [userBookings, setUserBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();

    const getUserBookings = async () => {
      try {
        const response = await axiosPrivate.get("/v1/booking", {signal: controller.signal});

        console.log("USER BOOKINGS:", response)

        setUserBookings(response?.data?.data?.bookingsDetails)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getUserBookings();

    return () => controller.abort();
  }, [axiosPrivate])

  const handleDeleteUserBooking = async (bookingId) => {
    try {
      await axiosPrivate.delete(`/v1/booking/${bookingId}`);

      setUserBookings(prev => (
        prev.filter(item => {
          return item.bookingId !== bookingId
        })
      ))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-3">
      {isLoading
        ? <p className="text-sm italic">Retrieving Bookings. Please wait...</p>
        : <div>
            <h1 className="text-center mb-4 font-semibold text-xl">My Bookings</h1>
            <div className="grid grid-cols-2 justify-items-center gap-8 w-310 place-self-center">
              {userBookings.map(booking => (
                <div key={booking.bookingId} className="grid grid-cols-2 gap-2 border rounded-md shadow-md p-4 w-150">
                  <div className="flex gap-3 ">
                    <SquareUser size={22}/>
                    <h1>Name</h1>
                  </div>
                  <h1> : {booking.firstName} {booking.lastName} </h1>
          
                  <div className="flex gap-3 ">
                    <MapPin size={22}/>
                    <h1>Address</h1>
                  </div>
                  <h1> : {booking.address} </h1>
          
                  <div className="flex gap-3 ">
                    <Phone size={22}/>
                    <h1>Phone #</h1>
                  </div>
                  <h1> : {booking.phoneNumber} </h1>
            
                  <div className="flex gap-3 ">
                    <Calendar1 size={22}/>
                    <h1>Pickup Date & Time</h1>
                  </div>
                  <h1> : {booking.pickupDateTime} </h1>
            
                  <div className="flex gap-3 ">
                    {booking.status === "PENDING" ? < CircleEllipsis size={22}/>
                      : booking.status === "CONFIRM" ? <CircleCheck size={22}/>
                      : booking.status === "COMPLETED" ? <CircleCheck size={22}/>
                      : booking.status === "DECLINED" && <CircleX size={22}/>}
                    <h1>Status</h1>
                  </div>
                  <h1>
                    :{" "}
                    <span
                      className={booking.status === "PENDING" ? "text-yellow-700 bg-amber-200 px-2 py-0.5 rounded-md" 
                        : booking.status === "CONFIRM" ? "text-green-700 bg-green-200 px-2 py-0.5 rounded-md" 
                        : booking.status === "COMPLETED" ? "text-blue-700 bg-blue-200 px-2 py-0.5 rounded-md"
                        : booking.status === "DECLINED" && "text-white bg-red-600 px-2 py-0.5 rounded-md"}
                    >
                      {booking.status} 
                    </span>
                  </h1>
              
                  <div className="flex gap-3 ">
                    <CarFront size={22}/>
                    <h1>Rented Vehicle</h1>
                  </div>
                  <h1> : {booking.vehicle.name} </h1>

                  <div className="flex gap-3 ">
                    <HandCoins size={22}/>
                    <h1>Total payment</h1>
                  </div>
                  <h1> : {booking.vehicle.price.toLocaleString()} </h1>

                  <div className="flex gap-3 mt-5">
                    <Button className="bg-sky-700 w-20 cursor-pointer hover:bg-sky-800">Edit</Button>
                    <Button 
                      variant="outline" 
                      className="w-20 cursor-pointer"
                      onClick={() => handleDeleteUserBooking(booking.bookingId)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>}
    </div>
  )
}

export default BookingsUser