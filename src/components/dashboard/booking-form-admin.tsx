import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import type { ApiError, BookingFormAdmin } from "@/lib/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema } from "@/lib/zodSchema";
import { LoaderCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PickupDateTime from "../common/pickup-date-time";
import useAxiosPrivate from "@/hooks/common/use-axios-private";
import useLogout from "@/hooks/common/use-logout";

//BookingAdminData infer BookingSchema types
type BookingAdminData = z.infer<typeof BookingSchema>

export default function BookingForm({
  vehicleId,
  setVehicleId
} : BookingFormAdmin) {
  const [pickupDate, setPickupDate] = useState<Date>(new Date());
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();
  const queryClient = useQueryClient()

  //useform & zod
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<BookingAdminData>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      pickupDate: new Date(),
      pickupDateTime: "",
    }
  });

  const {
    mutate: addBookingAmin
  } = useMutation({
    mutationFn: async (data : BookingAdminData) => {
      const formatedDateTime = format(new Date(data.pickupDate), "MM/dd/yyyy") + " " + data.pickupTime

     const response = await axiosPrivate.post("/v1/booking-admin",{
        firstName: data.firstName, 
        lastName: data.lastName, 
        address: data.address, 
        phoneNumber: data.phoneNumber, 
        pickupDateTime: formatedDateTime, 
        vehicleId: vehicleId,
      });

      toast.success("Booking information submit successfully")

      setVehicleId("")
      reset();

      return response
    },
    onSuccess: (response) => {
      console.log("Add booking admin:", response)
      queryClient.invalidateQueries({ queryKey: ["bookings"]})
      queryClient.invalidateQueries({ queryKey: ["recentBookings"]})
    },
    onError: async (error : ApiError) => {
      console.log(error)
      /* check if user is unauthorized */
      if (error?.status === 403) {
        navigate("/login");
        await logout();
      }
    }
  })


  const onSubmit = async (data : BookingAdminData) => {
    addBookingAmin(data)
  }

  return (
    <div className="border py-3 rounded-md shadow-md min-w-110 bg-white">
      <Toaster position="top-center"/>
      <h1 className="place-self-center">BOOKING FORM</h1>
      {vehicleId === null && <p className="text-center text-xs mt-4 text-red-500">Please select a vehicle to book first</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="px-5 flex flex-col gap-1">
        <div className="flex flex-col gap-3">
          <Label htmlFor="firstName">Firstname:</Label>
          <Input 
            id="firstName" 
            type="text" 
            {...register("firstName")} 
            className="border-gray-300"
          />
          {errors?.firstName && <p className="text-xs text-red-500">{errors?.firstName?.message}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="lastName">Lastname:</Label>
          <Input 
            id="lastName" 
            type="text" 
            {...register("lastName")} 
            className="border-gray-300"
          />
          {errors?.firstName && <p className="text-xs text-red-500">{errors?.lastName?.message}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="address">Address:</Label>
          <Input 
            id="address" 
            type="text" 
            {...register("address")} 
            className="border-gray-300"
          />
          {errors?.address && <p className="text-xs text-red-500">{errors?.address?.message}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="phoneNumber">Phone #:</Label>
          <Input 
            id="phoneNumber" 
            type="tel" 
            {...register("phoneNumber")} 
            className="border-gray-300"
          />
          {errors?.phoneNumber && <p className="text-xs text-red-500">{errors?.phoneNumber?.message}</p>}
        </div>
        <div>
          <fieldset className="border rounded-md p-3 border-gray-300 shadow-xs">
            <legend>Select Pickup</legend>
            <PickupDateTime 
              pickupDate={pickupDate} 
              setPickupDate={setPickupDate} 
              register={register}
              setValue={setValue}
            />
            {errors?.pickupDate && <p className="text-xs text-red-500 mt-4">{errors?.pickupDate?.message}</p>}
          </fieldset>
        </div>
        <div className="mt-5">
          <Button 
            type="submit" 
            className="cursor-pointer"
          >
            Submit
            {isSubmitting
              && <LoaderCircle 
                    size={50} 
                    className="animate-spin"
                  />}
          </Button>
        </div>
      </form>
    </div>
  )
}