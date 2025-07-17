import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useState } from "react"
import { PickupDateTime } from "../../components/subComponents/dateTime";
import { format } from "date-fns";
import useAxiosPrivate from "@/hooks/useAxiosPrivate"



export function EditFormDialogMyBookings({vehicles, ...booking}) {
  const [vehicleId, setVehicleId] = useState(booking.vehicleId);
  const [pickupDate, setPickupDate] = useState(booking.pickupDateTime.split(", ")[0])
  const [errMsg, setErrMsg] = useState({})
  const axiosPrivate = useAxiosPrivate();

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    try {
      let validationMsg = {}
      const formData = new FormData(e.target);

      const firstName = formData.get("firstName");
      if (firstName.length <= 0) {
        validationMsg.firstName = "Firstname must not be empty"
      }

      const lastName = formData.get("lastName");
      if (lastName.length <= 0) {
        validationMsg.lastName = "Lastname must not be empty"
      }

      const address = formData.get("address");
      if (address.length <= 0) {
        validationMsg.address = "Address must not be empty"
      }

      const phoneNumber = formData.get("phoneNumber");
      const PHONE_REGEX = /^(\+\d{12}|\d{11})$/;
      if (!PHONE_REGEX.test(phoneNumber)) {
        validationMsg.phoneNumber = "Invalid Phone number";
      }

      const now = format(new Date(), "MM/dd/yyyy");
      if (!pickupDate) {
        validationMsg.pickupDate = "Select Pickup Date"
      } else if (format(new Date(pickupDate), "MM/dd/yyyy") < now) {
        validationMsg.pickupDate = "Date must be today or later"
      }
      
      const formatedDate = format(new Date(pickupDate), "MM/dd/yyyy")
      const pickupDateTime = `${formatedDate}, ${formData.get("pickupTime")}`

      if (Object.keys(validationMsg).length > 0) {
        setErrMsg(validationMsg);
        return;
      }

      setErrMsg({})

      console.log("VEHICLE ID:", vehicleId)

      const response = await axiosPrivate.put(`/v1/booking/${booking.bookingId}`, {
        firstName, lastName, address, phoneNumber, pickupDateTime, vehicleId
      });

      console.log("UPDATE MY BOOKING:", response)
 
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="bg-sky-700 w-20 cursor-pointer hover:bg-sky-800"
          disabled={booking.status === "CONFIRM" || booking.status === "COMPLETED"}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form 
          className="flex flex-col gap-5"
          onSubmit={handleOnSubmit}  
        >
        <DialogHeader>
          <DialogTitle>Edit Booking Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label htmlFor="firstname">Firstname</Label>
            <Input id="firstname" name="firstName" defaultValue={booking.firstName}/>
            {errMsg.firstName && <p className="text-xs text-red-600">{errMsg.firstName}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="lastname">Lastname</Label>
            <Input id="lastname" name="lastName" defaultValue={booking.lastName}/>
            {errMsg.lastName && <p className="text-xs text-red-600">{errMsg.lastName}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" defaultValue={booking.address}/>
            {errMsg.address && <p className="text-xs text-red-600">{errMsg.address}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="phoneNumber">Phone #</Label>
            <Input id="phoneNumber" name="phoneNumber" defaultValue={booking.phoneNumber}/>
            {errMsg.phoneNumber && <p className="text-xs text-red-600">{errMsg.phoneNumber}</p>}
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
            {errMsg && <p className="text-xs text-red-500">{errMsg.pickupDate}</p>}
          </div>
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="vehicle">Vehicles</Label>
            <Select id="vehicle" defaultValue={vehicleId || undefined} onValueChange={(value) => {
              setVehicleId(value)
            }}
            >
              <SelectTrigger className="w-full">
                <SelectValue/>
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
              onClick={() => setErrMsg({})}
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
    </Dialog>
  )
}
