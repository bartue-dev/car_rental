import { SquareUser,
    MapPin,
    Phone,
    Calendar1,
    CircleCheck,
    CircleX,
    CircleEllipsis,
    CarFront,
    HandCoins,
    LoaderCircle
} from 'lucide-react';

import { Button } from "../ui/button";
import useAxiosPrivate from "@/hooks/common/use-axios-private";
import EditBookingsDialog from "./edit-bookings-dialog"; 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserBookingsTypes } from '@/lib/types';
import { Toaster } from 'sonner';

//BookingsUser Component
export default function BookingsUser() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  //react-query, useQuery method
  const {
      data: userBookings = [],
      isLoading,
      isError: userBookingIsErr,
      error: userBookingsErr
    } = useQuery({
      queryKey: ["userBookings"],
      queryFn: async () :  Promise<UserBookingsTypes[]> => {
        const response = await axiosPrivate.get("/v1/booking");
      
        return response?.data?.data?.bookingsDetails
      },
  });

  const {
    mutate: deleteUserBooking,
    isPending
    } = useMutation({
    mutationFn: async (bookingId: string) => {
      const response = await axiosPrivate.delete(`/v1/booking/${bookingId}`);

      return response?.data?.data?.bookingsDetails
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["userBookings"]})
    }
  });

  //delete fn
  const handleDeleteUserBooking = (bookingId : string) => {
    deleteUserBooking(bookingId)
  }


  //if userBookings query failed
  if (userBookingIsErr) {
    return (
      <div>
        {userBookingsErr.message === "Network Error"
          && <p className="text-sm italic text-center mb-5 mt-5">Check your network</p>}
      </div>
    )
  }

  return (
    <div className="p-3">
      <Toaster position="top-center"/>
      {isLoading
        ? <p className="text-sm italic">Retrieving Bookings. Please wait...</p>
        : <div>
            <h1 className="text-center mb-6 font-semibold text-2xl">My Bookings</h1>
            <div className="grid grid-cols-2 justify-items-center gap-8 w-310 place-self-center">
              {userBookings.map(booking => (
                <div key={booking.bookingId} className="grid grid-cols-2 gap-2 border rounded-md shadow-md p-4 w-150 bg-white">
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
                        : booking.status === "DECLINED" ? "text-white bg-red-600 px-2 py-0.5 rounded-md"
                        : ""}
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
                    <div>
                      <EditBookingsDialog
                        {...booking}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-20 cursor-pointer shadow-md"
                      onClick={() => handleDeleteUserBooking(booking.bookingId)}
                      disabled={booking.status === "CONFIRM" || booking.status === "COMPLETED"}
                    >
                      Delete
                      {isPending 
                        && <LoaderCircle 
                            size={50}
                            className="animate-spin" 
                          />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>}
    </div>
  )
}