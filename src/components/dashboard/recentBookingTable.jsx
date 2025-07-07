import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useEffect, useState  } from "react"
import { useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import { subDays, format } from "date-fns";

function RecentBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState()
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    const controller = new AbortController();

    const getAllBookings = async () => {
      try {
        const response = await axiosPrivate.get("/v1/booking-admin", {signal: controller.signal})

        const weekAgo = format(subDays(new Date(), 7), "yyyy-MM-dd");

        /* save only the data that is created or updated a week ago */
        for (const data of response.data.data.bookingsDetails) {
          const date = data.updatedAt.split("T")[0];

          if (date > weekAgo) {
            setBookings(prev => [...prev, data])
          }
        }

      } catch (error) {

        if (error?.code === "ERR_NETWORK") {
          setError(error?.message)
        } else if (error?.response?.status === 400) {
          setError(error?.response?.data?.message)
        } else if (error?.response?.status === 403) {
          await logout();
          navigate("/login")
        }

      } finally {
        setIsLoading(false)
      }
    }

    getAllBookings();


    return () => {
      controller.abort()
    }

  },[axiosPrivate])

  return (
    <div className="border rounded-md shadow-sm mt-10 max-w-300">
      <h1 className="p-3 font-semibold tracking-wide border-b-1">Recent Bookings</h1>
      {isLoading
        ? <p className="text-center italic">Retrieving recent bookings. Please wait </p>
        : <div className="max-h-[350px] overflow-auto">
          <Table>
            <TableCaption>{error ? error : "List of recent bookings."}</TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-200">
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
                <TableCell >
                    <span 
                      className={booking.status === "PENDING" ? "text-yellow-700 bg-amber-200 px-2 py-0.5 rounded-md" 
                          : booking.status === "CONFIRM" ? "text-green-700 bg-green-200 px-2 py-0.5 rounded-md" 
                          : booking.status === "COMPLETED" ? "text-blue-700 bg-blue-200 px-2 py-0.5 rounded-md"
                          : booking.status === "DECLINED" && "text-white bg-red-600 px-2 py-0.5 rounded-md"}
                    >
                      {booking.status}
                    </span>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>}      
    </div>
  )
}

export default RecentBookings