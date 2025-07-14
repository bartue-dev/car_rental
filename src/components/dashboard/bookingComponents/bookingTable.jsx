import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react"
import BookingActions from "../../subComponents/bookingsActions"

export function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  /* render booking details in a table */
  useEffect(() => {
    const controller = new AbortController();

    const getAllBookings = async () => {
      try {
        const bookings = await axiosPrivate.get("/v1/booking-admin", {signal: controller.signal});
        const vehicles = await axiosPrivate.get("/v1/vehicle-admin", {signal: controller.signal});

        setBookings(bookings?.data?.data?.bookingsDetails);
        setVehicles(vehicles?.data?.data?.vehicleDetails)

      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getAllBookings();


    return () => controller.abort();
  },[axiosPrivate])

  return (
    <div>
      <div className="border rounded-md shadow-sm p-2 font-poppins">
        <h1  className="p-3 font-semibold tracking-wide border-b-1">List of Bookings</h1>
        {isLoading
          ? <p className="text-center italic">Retrieving list of bookings. Please wait </p>
          : (bookings.length > 0 && vehicles.length > 0) 
          && <div className="max-h-[400px] overflow-auto">
              <Table>
              <TableCaption>A list of Bookings.</TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone #</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.bookingId}>
                    <TableCell>{booking.firstName} {booking.lastName}</TableCell>
                    <TableCell>{booking.address}</TableCell>
                    <TableCell>{booking.phoneNumber}</TableCell>
                    <TableCell>
                      <span 
                        className={booking.status === "PENDING" ? "text-yellow-700 bg-amber-200 px-2 py-0.5 rounded-md" 
                          : booking.status === "CONFIRM" ? "text-green-700 bg-green-200 px-2 py-0.5 rounded-md" 
                          : booking.status === "COMPLETED" ? "text-blue-700 bg-blue-200 px-2 py-0.5 rounded-md"
                          : booking.status === "DECLINED" && "text-white bg-red-600 px-2 py-0.5 rounded-md"}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <BookingActions
                        {...booking}
                        vehicles={vehicles}
                        setBookings={setBookings}
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