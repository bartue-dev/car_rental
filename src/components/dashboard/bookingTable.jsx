import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react"
import BookingActions from "../subComponents/bookingsActions"

export function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  /* render booking details in a table */
  useEffect(() => {
    const controller = new AbortController();

    const getAllBookings = async () => {
      try {
        const response = await axiosPrivate("/v1/booking-admin", {signal: controller.signal});

        console.log(response)

        setBookings(response?.data?.data?.bookingsDetails);

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
    <div className="border rounded-md shadow-sm p-2">
      <h1  className="p-3 font-semibold tracking-wide border-b-1">List of Bookings</h1>
      {isLoading
        ? <p className="text-center italic">Retrieving list of bookings. Please wait </p>
        :  <Table >
            <TableCaption>A list of Bookings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone #</TableHead>
                <TableHead>Status</TableHead>
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
                        : booking.status === "COMPLETED" && "text-blue-700 bg-blue-200 px-2 py-0.5 rounded-md"}
                    >
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <BookingActions
                      {...booking}
                      setBookings={setBookings}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>}
     
    </div>
  )
}
