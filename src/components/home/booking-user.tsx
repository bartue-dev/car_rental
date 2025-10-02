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
    <div className="p-5">
      <Toaster position="top-center"/>
      {isLoading
        ? <p className="text-sm italic text-center">Retrieving Bookings. Please wait...</p>
        : <div className="px-10">
            <h1 className="text-center mb-6 font-semibold text-2xl">My Bookings</h1>
            <div 
              className="grid md:grid-cols-2 justify-items-center gap-8 place-self-center text-xs lg:text-base"
            >
              {userBookings.map(booking => (
                <div 
                  key={booking.bookingId} 
                  className="grid grid-cols-2 gap-2 items-center border rounded-md shadow-md p-4 bg-white w-100"
                >
                  <div className="flex gap-3 items-center">
                    <SquareUser className="w-4" />
                    <h1>Name</h1>
                  </div>
                  <h1 className="break-words" > : {booking.firstName} {booking.lastName} </h1>
          
                  <div className="flex gap-3 items-center">
                    <MapPin className="w-4" />
                    <h1>Address</h1>
                  </div>
                  <h1 className="break-words"> : {booking.address} </h1>
          
                  <div className="flex gap-3 items-center">
                    <Phone className="w-4" />
                    <h1>Phone #</h1>
                  </div>
                  <h1 className="break-words"> : {booking.phoneNumber} </h1>
            
                  <div className="flex gap-3 items-center">
                    <Calendar1 className="w-4" />
                    <h1>Pickup Date & Time</h1>
                  </div>
                  <h1 className="break-words"> : {booking.pickupDateTime} </h1>
            
                  <div className="flex gap-3 items-center">
                    {booking.status === "PENDING" ? < CircleEllipsis className="w-4" />
                      : booking.status === "CONFIRM" ? <CircleCheck className="w-4" />
                      : booking.status === "COMPLETED" ? <CircleCheck className="w-4" />
                      : booking.status === "DECLINED" && <CircleX className="w-4" />}
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
              
                  <div className="flex gap-3 items-center">
                    <CarFront className="w-4" />
                    <h1>Rented Vehicle</h1>
                  </div>
                  <h1 className="break-words"> : {booking.vehicle.name} </h1>

                  <div className="flex gap-3 items-center">
                    <HandCoins className="w-4" />
                    <h1>Total payment</h1>
                  </div>
                  <h1 className="break-words"> : {booking.vehicle.price.toLocaleString()} </h1>

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
                            className="animate-spin w-4" 
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