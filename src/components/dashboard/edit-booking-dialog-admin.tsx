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
import type{ EditBookingsDialogAdmin } from "@/lib/types"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BookingSchema } from "@/lib/zodSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"
import useAxiosPrivate from "@/hooks/common/use-axios-private"
import PickupDateTime from "../common/pickup-date-time"
import useVehiclesAdmin from "@/hooks/react-query/vehicles-query-admin"

//EditBookingAdminData
type EditBookingAdminData = z.infer<typeof BookingSchema>

//EditFormDialogBooking admin component
export default function EditBookingsDialogAdmin({
  setIsEditDialogOpen,
  status : statusProp,
  ...booking
} : EditBookingsDialogAdmin) {
  const [status, setStatus] = useState(statusProp || "PENDING")
  const [vehicleId, setVehicleId] = useState(booking.vehicleId)
  const [pickupDate, setPickupDate] = useState(
    booking.pickupDateTime
      ? new Date( booking.pickupDateTime.split(" ")[0])
      : new Date()
    )
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient()

  //zod & useForm
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isSubmitting}
  } = useForm<EditBookingAdminData>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      pickupDate: new Date(),
      pickupDateTime: "",
      status: ""
    }
  });

  //vehicles custom useQuery
  const { 
    vehicles,
    vehiclesIsLoading,
    vehiclesIsErr,
    vehiclesErr
  } = useVehiclesAdmin()
  

  //editBookingAdmin useMutation
  const {
    mutate: editBookingAdmin,
  } = useMutation({
    mutationFn: async (data : EditBookingAdminData)  => {
      const formatedDateTime = format(new Date(pickupDate), "MM/dd/yyyy") + " " + data.pickupTime

      const response = await axiosPrivate.put(`/v1/booking-admin/${booking.bookingId}`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          pickupDateTime: formatedDateTime,
          status: status,
          vehicleId: vehicleId
        }
      )
      setIsEditDialogOpen(false)
      reset()

      return response
    },
    onSuccess: (response) => {
      console.log("Admin edit bookings", response)
      queryClient.invalidateQueries({ queryKey: ["bookings"]})
    }
  })

  /* update booking function */
  const onSubmit = (data: EditBookingAdminData) => {
    editBookingAdmin(data)
  }

  //vehicles query error
  if (vehiclesIsErr) {
    return (
      <div className="text-xs text-red-600 text-center">
        {vehiclesErr?.message || "An error occured!"}, at edit booking admin
      </div>
    )
  }

  return (
    <DialogContent className="sm:max-w-[425px] font-poppins">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <DialogHeader>
          <DialogTitle>Edit Booking Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {errors?.firstName 
            && <p className="text-xs text-red-500">{errors?.firstName.message}</p>}
          {errors?.lastName 
            && <p className="text-xs text-red-500">{errors?.lastName.message}</p>}
          {errors?.address 
            && <p className="text-xs text-red-500">{errors?.address.message}</p>}
          {errors?.phoneNumber 
            && <p className="text-xs text-red-500">{errors?.phoneNumber.message}</p>}
          {errors?.pickupDate 
            && <p className="text-xs text-red-500">{errors?.pickupDate.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="firstname">Firstname</Label>
            <Input 
              id="firstname" 
              {...register("firstName")} 
              defaultValue={booking.firstName} 
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="lastname">Lastname</Label>
            <Input 
              id="lastname" 
              {...register("lastName")}  
              defaultValue={booking.lastName} 
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address"
              {...register("address")}  
              defaultValue={booking.address} 
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phoneNumber">Phone #</Label>
            <Input 
              id="phoneNumber" 
              {...register("phoneNumber")} 
              defaultValue={booking.phoneNumber} 
            />
          </div>
          <div className="col-span-2">
            <fieldset className="border rounded-md p-3 border-gray-300 shadow-xs">
              <legend className="text-sm font-semibold">Select Pickup</legend>
              <PickupDateTime 
                pickupDate={pickupDate} 
                setPickupDate={setPickupDate}
                pickupTime={booking?.pickupDateTime?.split(" ")[1]}
                register={register}
                setValue={setValue}
              />
            </fieldset>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select  
              defaultValue={status} 
              onValueChange={(value) => {
              setStatus(value)
              setValue("status", value, {shouldValidate: true})
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
            <Select  
              defaultValue={vehicleId} 
              onValueChange={(value) => {
              setVehicleId(value)
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-vehicles-"/>
              </SelectTrigger>
              <SelectContent>
                {vehiclesIsLoading
                  ? <p className="text-xs italic">Retrieving vehicles data. Please wait...</p>
                  : vehicles.map((vehicle) => (
                    vehicle.status === "Available"
                    &&  <SelectItem 
                          key={vehicle?.vehicleId} 
                          value={vehicle?.vehicleId}
                        >
                          {vehicle?.name}
                        </SelectItem>
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
            disabled={isSubmitting}
          >
            Save changes
            {isSubmitting && <LoaderCircle className="animate-spin m-auto"/>}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}