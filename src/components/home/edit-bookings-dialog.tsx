import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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
import { format } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { GetAllVehiclesTypes, UserBookingsTypes } from "@/lib/types"
import useAxiosPrivate from "@/hooks/use-axios-private"
import PickupDateTime from "../common/pickup-date-time"
import { BookingSchema } from "@/lib/zodSchema"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"

//EditBookingData infer BookingSchema type
type EditBookingData = z.infer<typeof BookingSchema>

//EditBookingDialog Component
export default function EditBookingsDialog({...booking} : UserBookingsTypes) {
  const [isOpen, setIsOpen] = useState(false)
  const [vehicleId, setVehicleId] = useState(booking.vehicleId);
  const [pickupDate, setPickupDate] = useState(new Date(booking.pickupDateTime.split(", ")[0]))
  const axiosPrivate = useAxiosPrivate();

  //vehicles useQuery
  const {
    data: vehicles = [],
    isLoading: vehiclesIsLoading,
    isError: vehiclesIsErr,
    error: vehiclesErr
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () : Promise<GetAllVehiclesTypes[]> => {
      const response = await axiosPrivate.get("/v1/vehicle");
      return response.data.data.vehicleDetails
    }
  });

  //Useform
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<EditBookingData>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      pickupDate: new Date(),
      pickupDateTime: ""
    }
  });


  //editBooking useMutation
  const {
    mutate: editBooking,
  } = useMutation({
    mutationFn: async (data: EditBookingData) => {
      //pickupDateTime for backend query
      const formatedDateTime = format(new Date(data.pickupDate), "MM/dd/yyyy") + " " + data.pickupTime;

      const response = await axiosPrivate.put(`/v1/booking/${booking.bookingId}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        pickupDateTime: formatedDateTime,
        vehicleId: vehicleId
      });

      return response
 
    },
    onSuccess: () => {
      toast.success("Booking information edited successfully");
      reset();
    }
  })

  const onSubmit = (data: EditBookingData) => {
    editBooking(data)
    setIsOpen(false)
  }

  //if vehicle query failed
  if (vehiclesIsErr) {
    return (
      <div>
        {vehiclesErr.message === "Network Error"
          && <p className="text-sm italic text-center mb-5 mt-5">Check your network</p>}
      </div>
    )
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-sky-700 w-20 cursor-pointer hover:bg-sky-800"
          disabled={booking.status === "CONFIRM" || booking.status === "COMPLETED"}
          onClick={() => setIsOpen(true)}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form 
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}  
        >
        <DialogHeader>
          <DialogTitle>Edit Booking Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label htmlFor="firstname">Firstname</Label>
            <Input 
              id="firstname" 
              {...register("firstName")} 
              defaultValue={booking.firstName}
            />
            {errors?.firstName && <p className="text-xs text-red-600">{errors.firstName?.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="lastname">Lastname</Label>
            <Input 
              id="lastname" 
              {...register("lastName")}
              defaultValue={booking.lastName}
            />
            {errors?.lastName && <p className="text-xs text-red-600">{errors?.lastName?.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              {...register("address")} 
              defaultValue={booking.address}
            />
            {errors?.address && <p className="text-xs text-red-600">{errors?.address?.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="phoneNumber">Phone #</Label>
            <Input 
              id="phoneNumber" 
              {...register("phoneNumber")} 
              defaultValue={booking.phoneNumber}
            />
            {errors?.phoneNumber && <p className="text-xs text-red-600">{errors?.phoneNumber?.message}</p>}
          </div>
          <div className="col-span-2">
            <fieldset className="border rounded-md p-3 border-gray-300 shadow-xs">
              <legend className="text-sm font-semibold">Select Pickup</legend>
              <PickupDateTime 
                pickupDate={pickupDate} 
                setPickupDate={setPickupDate}
                pickupTime={booking.pickupDateTime.split(", ")[1]}
                register={register}
                setValue={setValue}
              />
            </fieldset>
            {errors?.pickupDate && <p className="text-xs text-red-500">{errors?.pickupDate.message}</p>}
          </div>
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="vehicle">Vehicles</Label>
            <Select 
              defaultValue={vehicleId || undefined} onValueChange={(value) => {
              setVehicleId(value)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue/>
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
          <Button 
            variant="outline"
            type="button"
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="cursor-pointer"  
            disabled={isSubmitting}
          >
            Save changes
            {isSubmitting && <LoaderCircle className="animate-spin"/>}
          </Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}