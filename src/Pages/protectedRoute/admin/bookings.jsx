import { BookingTable } from "@/components/dashboard/bookingComponents/bookingTable";
import { Outlet, useLocation, Link } from "react-router-dom";
import { ClipboardPlus } from 'lucide-react';

function Bookings() {
  const location = useLocation();

  const addBookingPath = location.pathname.split("/").pop()

  return (
    <div>
      {addBookingPath === "add-booking"
        ? <Outlet />
        :  <div>
              <div className="mb-5">
                <h1 className="text-sm">Quick Actions</h1>
                <div className="flex justify-between items-center gap-5 mt-2">
                  <Link to="/dashboard/admin/bookings/add-booking" className="border rounded-sm w-60 h-20 p-5 flex items-center gap-5 shadow-xs cursor-pointer">
                    <ClipboardPlus size={35} strokeWidth={1}/>
                    <div>
                      <h1 className="text-sm">Add Bookings</h1>
                    </div>
                  </Link>
                </div>
              </div>
              <BookingTable/>
          </div>}
    </div>
  )
}

export default Bookings;