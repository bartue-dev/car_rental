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
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { useState } from "react"

export function EditFormDialog({bookingId, firstName, lastName, address, phoneNumber, status, setBookings, setIsEditDialogOpen}) {
  const axiosPrivate = useAxiosPrivate();
  const [getStatus, setStatus] = useState("PENDING")

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

      const response = await axiosPrivate.put(`/v1/booking-admin/${bookingId}`,
        {firstName, lastName, address, phoneNumber, status}
      )

      console.log("UPDATE BOOKING DETAILS: ", response);

      setBookings(prev => (
        prev.map((item) => {
          return item.bookingId === bookingId ? {...item, ...response?.data?.data?.updatedBookingDetails} : item
        })
      ))

      setIsEditDialogOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSaveDialog} className="flex flex-col gap-5">
        <DialogHeader>
          <DialogTitle>Edit Booking Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="firstname">Firstname</Label>
            <Input id="firstname" name="firstName" defaultValue={firstName} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="lastname">Lastname</Label>
            <Input id="lastname" name="lastName" defaultValue={lastName} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" defaultValue={address} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phoneNumber">Phone #</Label>
            <Input id="phoneNumber" name="phoneNumber" defaultValue={phoneNumber} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select id="status" defaultValue={status} onValueChange={(value) => {
              setStatus(value)
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="CONFIRM">CONFIRM</SelectItem>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
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
          >Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
