import { ClipboardPlus, MessageCircle  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function QuickActions() {
  const navigate = useNavigate();

  const toBookings = () => {
    navigate("/dashboard/admin/bookings/add-booking")
  }

  const toVehicles = () => {
    navigate("/dashboard/admin/vehicles/add-vehicle")
  }

  const toTestimonials = () => {
    navigate("/dashboard/admin/testimonials")
  }

  return (
    <div className="mt-10">
      <h1 className="text-sm">Quick Actions</h1>
      <div className="flex justify-between items-center gap-5 mt-2">
        <div 
          className="border rounded-sm w-full h-20 p-5 flex items-center gap-5 shadow-xs cursor-pointer"
          onClick={toBookings}
        >
          <ClipboardPlus size={35} strokeWidth={1}/>
          <div>
            <h1 className="text-sm">Add Bookings</h1>
          </div>
        </div>
        <div 
          className="border rounded-sm w-full h-20 p-5 flex items-center gap-5 shadow-xs cursor-pointer"
          onClick={toVehicles}
        >
          <ClipboardPlus size={35} strokeWidth={1}/>
          <div>
            <h1 className="text-sm">Add Vehicle</h1>
          </div>
        </div>
        <div 
          className="border rounded-sm w-full h-20 p-5 flex items-center gap-5 shadow-xs cursor-pointer"
          onClick={toTestimonials}
        >
          <MessageCircle size={30} strokeWidth={1}/>
          <div>
            <h1 className="text-sm">Review testimonials</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickActions;