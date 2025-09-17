import PickupDateTime from "../common/pickup-date-time";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import useAxiosPrivate from "@/hooks/use-axios-private";
import useLogout from "@/hooks/use-logout";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/lib/types";
import { LoaderCircle } from "lucide-react";

//BookingSchema
const BookingSchema = z.object({
  firstName: z.string().min(1, "Firstname must not be empty"),
  lastName: z.string().min(1, "Lastname must not be empty"),
  address: z.string().min(1, "Address must bot be empty"),
  phoneNumber: z.string().regex(/^(\+\d{12}|\d{11})$/, "Invalid Phone number"),
  pickupDate: z.date("Invalid Date"),
  pickupTime: z.string(),
  pickupDateTime: z.string() 
}).superRefine(({pickupDate}, ctx) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const selectedDate = new Date(pickupDate).setHours(0, 0, 0, 0);

  console.log(today)
  console.log(selectedDate)
  
  if (selectedDate < today) {
    console.log("Date must be today or later")
    ctx.addIssue({
      code: "custom",
      message: "Date must be today or later",
      path: ["pickupDate"]
    })
  }
})

//BookingData infer BookingSchema type
export type BookingData = z.infer<typeof BookingSchema>

//BookingForm Component
export default function BookingForm({vehicleId} : {vehicleId: string}) {
  const [pickupDate, setPickupDate] = useState<Date>(new Date());
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  // useEffect(() => {
  //   console.log(pickupDate < new Date())
  // },[pickupDate])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<BookingData>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      pickupDate: new Date(),
      pickupDateTime: "",
    }
  });

  const {
    mutate: addBooking,
  } = useMutation({
    mutationFn: async (data: BookingData) => {
       //pickupDateTime for backend query
      const formatedDateTime = format(new Date(data.pickupDate), "MM/dd/yyyy") + " " + data.pickupTime;

      //backend
      const response = await axiosPrivate.post("/v1/booking",{
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        pickupDateTime: formatedDateTime,
        vehicleId: vehicleId
      });

     return response
    },
    onSuccess: (response) => {
      console.log("BOOKING RESPONSE:", response)

      toast.success("Booking information submit successfully")

      reset();
    }, 
    onError: async (error : ApiError) => {
      console.error(error)
      if (error?.status === 403) {
        await logout();
        navigate("/login", { state: { from: location }, replace:true });
      }
    }
  })

  const onSubmit =  (data: BookingData) => {
    addBooking(data)
  }

  return (
    <div className="border py-3 rounded-md shadow-md bg-white">
      <Toaster position="top-center"/>
      <h1 className="place-self-center mb-2">BOOKING FORM</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5 flex flex-col gap-3">
        <div className="flex flex-col">
          <Label 
            htmlFor="firstName"
            className="mb-2"  
          >
            Firstname:
          </Label>
          <Input 
            id="firstName" 
            type="text" 
            {...register("firstName")} 
            className="border-gray-300"
          />
          {errors?.firstName && <p className="text-xs text-red-500 mt-2">{errors?.firstName?.message}</p>}
        </div>
        <div className="flex flex-col">
          <Label 
            htmlFor="lastName"
            className="mb-2"  
          >
            Lastname:
          </Label>
          <Input 
            id="lastName" 
            type="text" 
            {...register("lastName")} 
            className="border-gray-300"
          />
          {errors?.lastName && <p className="text-xs text-red-500 mt-2">{errors?.lastName?.message}</p>}
        </div>
        <div className="flex flex-col">
          <Label 
            htmlFor="address"
            className="mb-2"  
          >
            Address:
          </Label>
          <Input 
            id="address" 
            type="text" 
            {...register("address")} 
            className="border-gray-300"
          />
          {errors?.address && <p className="text-xs text-red-500 mt-2">{errors?.address?.message}</p>}
        </div>
        <div className="flex flex-col">
          <Label 
            htmlFor="phoneNumber"
            className="mb-2"  
          >
            Phone #:
          </Label>
          <Input 
            id="phoneNumber" 
            type="tel" 
            {...register("phoneNumber")} 
            className="border-gray-300"
          />
          {errors?.phoneNumber && <p className="text-xs text-red-500 mt-2">{errors?.phoneNumber?.message}</p>}
        </div>
        <div>
          <fieldset className="border rounded-md p-3 border-gray-300 shadow-xs">
            <legend>Select Pickup Data & Time</legend>
            <PickupDateTime 
              pickupDate={pickupDate} 
              setPickupDate={setPickupDate}
              register={register}
              setValue={setValue}
            />
            {errors?.pickupDate && <p className="text-xs text-red-500 mt-2">{errors?.pickupDate?.message}</p>}
          </fieldset>
        </div>
        <div className="mt-5">
          <Button 
            type="submit" 
            className="cursor-pointer w-full"
            disabled={isSubmitting}
          >
            Submit
            {isSubmitting && <LoaderCircle className="animate-spin"/>}
          </Button>
        </div>
      </form>
    </div>
  )
}