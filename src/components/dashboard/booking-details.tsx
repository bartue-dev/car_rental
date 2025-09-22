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

import {
  DialogContent,
} from "@/components/ui/dialog"

export default function BookingDetails({...booking}) {
  return (
    <DialogContent className="sm:max-w-[600px] font-poppins">
      <h1 className="font-semibold tracking-wide text-xl">Booking Details</h1>
      <div className="border rounded-md p-4 flex flex-col justify-center gap-3">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex gap-3 ">
            <SquareUser size={22}/>
            <h1>Name</h1>
          </div>
          <h1> : {booking.firstName} {booking.lastName} </h1>
        {/* </div>
        <div className="flex items-center gap-5 "> */}
          <div className="flex gap-3 ">
            <MapPin size={22}/>
            <h1>Address</h1>
          </div>
          <h1> : {booking.address} </h1>
        {/* </div>
        <div className="flex items-center gap-5 "> */}
          <div className="flex gap-3 ">
            <Phone size={22}/>
            <h1>Phone #</h1>
          </div>
          <h1> : {booking.phoneNumber} </h1>
        {/* </div>
        <div className="flex items-center gap-5 "> */}
          <div className="flex gap-3 ">
            <Calendar1 size={22}/>
            <h1>Pickup Date & Time</h1>
          </div>
          <h1> : {booking.pickupDateTime} </h1>
        {/* </div>
        <div className="flex items-center gap-5 "> */}
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
              className={
                booking.status === "PENDING" ? "text-yellow-700 bg-amber-200 px-2 py-0.5 rounded-md" 
                : booking.status === "CONFIRM" ? "text-green-700 bg-green-200 px-2 py-0.5 rounded-md" 
                : booking.status === "COMPLETED" ? "text-blue-700 bg-blue-200 px-2 py-0.5 rounded-md"
                : booking.status === "DECLINED" ? "text-white bg-red-600 px-2 py-0.5 rounded-md"
                : ""}
            >
              {booking.status} 
            </span>
          </h1>
        {/* </div>
        <div className="flex items-center gap-5 "> */}
          <div className="flex gap-3 ">
            <CarFront size={22}/>
            <h1>Rented Vehicle</h1>
          </div>
          <h1> : {booking.vehicle.name} </h1>

          <div className="flex gap-3 ">
            <HandCoins size={22}/>
            <h1>Initial payment</h1>
          </div>
          <h1> : {booking.vehicle.price.toLocaleString()} </h1>
        </div>
      </div>
    </DialogContent>
  )
}