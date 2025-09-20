import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useNavigate } from "react-router-dom";
import { subDays, format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import useLogout from "@/hooks/use-logout";
import useAxiosPrivate from "@/hooks/use-axios-private";
import type { ApiError, RecentBookingsTypes } from "@/lib/types";

export default function RecentBookings() {
  // const [bookings, setBookings] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState()
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();


  const {
    data: recentBookings = [],
    isLoading, 
    isError,
    error
  } = useQuery({
    queryKey: ["recentBookings"],
    queryFn: async () : Promise<RecentBookingsTypes[]> => {
      try {
        const response = await axiosPrivate.get("/v1/booking-admin")
        const weekAgo = format(subDays(new Date(), 7), "yyyy-MM-dd");

        const result : RecentBookingsTypes[] = []
        /* save only the data that is created or updated a week ago */
        for (const data of response.data.data.bookingsDetails) {
          const date = data.updatedAt.split("T")[0];

          if (date > weekAgo) {
            result.push(data)
          }
        }

        return result

        // const data = response.data.data.bookingsDetails.filter(data => {
        //   const date = data.updatedAt.split("T")[0]

        //   return date > weekAgo
        // });

        // return data
      } catch (err) {
        const error = err as ApiError
        if (error?.code === "ERR_NETWORK") {
          throw new Error("Please check your network")
        } else if (error?.response?.status === 400) {
          throw new Error("Bad request")
        } else if (error?.response?.status === 403) {
          await logout();
          navigate("/login")
          throw new Error("Unauthorized")
        } else {
          throw new Error("An unexpected error occured")
        }
      }
    }
  });

  console.log(recentBookings)

  if (isError) {
    return (
      <div>
        {error.message || "An error occured"}
      </div>
    )
  }

  return (
    <div className="border rounded-md shadow-sm mt-10 max-w-300 bg-white">
      <h1 className="p-3 font-semibold tracking-wide border-b-1">Recent Bookings</h1>
      {isLoading
        ? <p className="text-center italic">Retrieving recent bookings. Please wait </p>
        : <div className="max-h-[350px] overflow-auto">
          <Table>
            <TableCaption>"List of recent bookings."</TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone #</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
              <TableRow key={booking.bookingId}>
                <TableCell>{booking.firstName} {booking.lastName}</TableCell>
                <TableCell>{booking.address}</TableCell>
                <TableCell>{booking.phoneNumber}</TableCell>
                <TableCell >
                    <span 
                      className={booking.status === "PENDING" ? "text-yellow-700 bg-amber-200 px-2 py-0.5 rounded-md" 
                          : booking.status === "CONFIRM" ? "text-green-700 bg-green-200 px-2 py-0.5 rounded-md" 
                          : booking.status === "COMPLETED" ? "text-blue-700 bg-blue-200 px-2 py-0.5 rounded-md"
                          : booking.status === "DECLINED" ? "text-white bg-red-600 px-2 py-0.5 rounded-md"
                          : ""}
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