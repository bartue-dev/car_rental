import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import useAxiosPrivate from "@/hooks/common/use-axios-private";
import BookingActions from "./bookings-actions";
import { useQuery } from "@tanstack/react-query";
import type { BookingsAdminTypes } from "@/lib/types";

export default function BookingTable() {
  const axiosPrivate = useAxiosPrivate();

  //bookings useQuery
  const {
    data: bookings = {bookingDetails: [], vehicles: []},
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () : Promise<BookingsAdminTypes> => {
      const [bookingData, vehicleData] = await Promise.all([
        axiosPrivate.get("/v1/booking-admin"),
        axiosPrivate.get("/v1/vehicle-admin")
      ]);

      return {
        bookingDetails: bookingData?.data?.data?.bookingsDetails,
        vehicles: vehicleData?.data?.data?.vehicleDetails
      }
    }
  })

  //if bookings useQuery failed
  if (isError) {
    return (
      <div>
        {error.message || "An error occured"}
      </div>
    )
  }

  return (
    <div>
      <div className="border rounded-md shadow-sm p-2 font-poppins bg-white">
        <h1  className="p-3 font-semibold tracking-wide border-b-1">List of Bookings</h1>
        {isLoading
          ? <p className="text-center italic">Retrieving list of bookings. Please wait </p>
          : (bookings?.bookingDetails.length > 0 && bookings?.vehicles.length > 0) 
          && <div className="max-h-[400px] overflow-auto">
              <Table>
              <TableCaption>A list of Bookings.</TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone #</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings?.bookingDetails.map((booking) => (
                  <TableRow key={booking.bookingId}>
                    <TableCell>{booking.firstName} {booking.lastName}</TableCell>
                    <TableCell>{booking.address}</TableCell>
                    <TableCell>{booking.phoneNumber}</TableCell>
                    <TableCell>
                      <span 
                        className={
                          booking.status === "PENDING" ? "text-yellow-700 bg-amber-200 px-2 py-0.5 rounded-md" 
                          : booking.status === "CONFIRM" ? "text-green-700 bg-green-200 px-2 py-0.5 rounded-md" 
                          : booking.status === "COMPLETED" ? "text-blue-700 bg-blue-200 px-2 py-0.5 rounded-md"
                          : booking.status === "DECLINED" ? "text-white bg-red-600 px-2 py-0.5 rounded-md"
                          : ""}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <BookingActions
                        {...booking}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>}
      
      </div>
    </div>
  )
}