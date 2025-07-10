import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns";
import { useState } from "react"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { PickupDateTime } from "../../subComponents/dateTime";


export function EditFormDialogBooking({setBookings, setIsEditDialogOpen, status, vehicles, ...booking}) {
  const axiosPrivate = useAxiosPrivate();
  const [getStatus, setStatus] = useState(status || "PENDING")
  const [pickupDate, setPickupDate] = useState(booking.pickupDateTime.split(", ")[0])
  const [vehicleId, setVehicleId] = useState(booking.vehicleId)

  // useEffect(() => {
  //   console.log("pickupDate", pickupDate)
  // },[])

  /* update booking function */
  const handleSaveDialog = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData(e.target);

      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const address = formData.get("address");
      const phoneNumber = formData.get("phoneNumber");
      const status = getStatus

      
      const formatedDate = format(new Date(pickupDate), "MM/dd/yyyy")
      const pickupDateTime = `${formatedDate}, ${formData.get("pickupTime")}`

      const response = await axiosPrivate.put(`/v1/booking-admin/${booking.bookingId}`,
        {firstName, lastName, address, phoneNumber, pickupDateTime, status, vehicleId}
      )

      console.log("UPDATE BOOKING DETAILS: ", response);

      setBookings(prev => (
        prev.map((item) => {
          return item.bookingId === booking.bookingId ? {...item, ...response?.data?.data?.updatedBookingDetails} : item
        })
      ))

      setIsEditDialogOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px] font-poppins">
      <form onSubmit={handleSaveDialog} className="flex flex-col gap-5">
        <DialogHeader>
          <DialogTitle>Edit Booking Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="firstname">Firstname</Label>
            <Input id="firstname" name="firstName" defaultValue={booking.firstName} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="lastname">Lastname</Label>
            <Input id="lastname" name="lastName" defaultValue={booking.lastName} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" defaultValue={booking.address} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phoneNumber">Phone #</Label>
            <Input id="phoneNumber" name="phoneNumber" defaultValue={booking.phoneNumber} />
          </div>
          <div className="col-span-2">
            <fieldset className="border rounded-md p-3 border-gray-300 shadow-xs">
              <legend className="text-sm font-semibold">Select Pickup</legend>
              <PickupDateTime 
                pickupDate={pickupDate} 
                setPickupDate={setPickupDate}
                pickupTime={booking.pickupDateTime.split(", ")[1]}
              />
            </fieldset>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select id="status" defaultValue={status} onValueChange={(value) => {
              setStatus(value)
            }}>
              <SelectTrigger className="w-full">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="CONFIRM">CONFIRM</SelectItem>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                <SelectItem value="DECLINED">DECLINED</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="vehicle">Vehicles</Label>
            <Select id="vehicle" defaultValue={vehicleId} onValueChange={(value) => {
              setVehicleId(value)
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-vehicles-"/>
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.vehicleId} value={vehicle.vehicleId}>{vehicle.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button 
              variant="outline"
              type="button"
              className="cursor-pointer"
            >Cancel</Button>
          </DialogClose>
          <Button 
            type="submit"
            className="cursor-pointer"  
          >
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
