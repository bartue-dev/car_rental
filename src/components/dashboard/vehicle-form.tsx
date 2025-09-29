import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Toaster, toast } from 'sonner'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoaderCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { VehicleSchema } from "@/lib/zodSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ApiError } from "@/lib/types"
import useAxiosPrivate from "@/hooks/common/use-axios-private"
import useLogout from "@/hooks/common/use-logout"

//VehicleData infer VehicleSchema types
type VehicleData = z.infer<typeof VehicleSchema>

//VehicleForm Component
export default function VehicleForm() {
  // const [getStatus, setStatus] = useState("Available");
  // const [errMsg, setErrMsg] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();
  const queryClient = useQueryClient();

  //useform && zod
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isSubmitting}
  } = useForm<VehicleData>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      status: "Available"
    }
  });

  //addVehicle useMutation
  const {
    mutate: addVehicle
  } = useMutation({
    mutationFn: async (data : VehicleData) => {
       //add the data in backend
      const vehicleResponse = await axiosPrivate.post("/v1/vehicle-admin", {
        name: data.name,
        type: data.type, 
        status: data.status, 
        price: data.price
      });

      const vehicleData = vehicleResponse?.data?.data?.vehicleDetails

      const imageFormData = new FormData();
      imageFormData.append("file", data.file[0])

      const imageData = await axiosPrivate.post(`/v1/images-admin/vehicle/${vehicleData.vehicleId}`, 
        imageFormData,
        {headers: {"Content-Type": "multipart/form-data"}}
      );

      return {vehicleData, imageData}
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["vehicles"]})
      toast.success("Vehicle added successfully")
      reset();
    },
    onError: async (error: ApiError) => {
      console.error(error)

       /* check if user is unauthorized */
      if (error?.status === 403) {
        navigate("/login");
        await logout();
      }

      if (error?.response?.data?.errors?.error === "Duplicate") {
        toast.error("Vihicle already exist")
        return;
      }
    }
  })

  //onSubmit function
  const onSubmit = (data : VehicleData) => {
    addVehicle(data)
  }

  return (
    <div className="border rounded-md shadow-sm py-5 px-3 max-w-200 bg-white">
      <Toaster position="top-center"/>
      <h1 className="place-self-center">VEHICLE FORM</h1>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4"
      >
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            {...register("name")} 
            type="text" 
          />
          {errors?.name && <p className="text-xs text-red-600"> {errors?.name?.message} </p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="type">Type</Label>
          <Input 
            id="type" 
            {...register("type")} 
            type="text" 
          />
          {errors?.type && <p className="text-xs text-red-600"> {errors?.type?.message} </p>}
        </div>
         <div className="grid gap-3">
          <Label htmlFor="status">Status</Label>
          <Select  
            defaultValue="Available" 
            onValueChange={(value) => {
              setValue("status", value, {shouldValidate: true})
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Not Available">Not Available</SelectItem>
            </SelectContent>
          </Select>
          {errors?.status && <p className="text-xs text-red-600">{errors?.status?.message}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="price">Price</Label>
          <Input 
            id="price" 
            {...register("price", { valueAsNumber: true})} 
            type="number" 
          />
          {errors?.price  && <p className="text-xs text-red-600"> {errors?.price?.message} </p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="file">Image</Label>
          <Input 
            id="file" 
            {...register("file")} 
            type="file" 
            accept="image/*"
            className="cursor-pointer"
          />
          {errors?.file && <p className="text-xs text-red-600"> {errors?.file?.message?.toString()} </p>}
        </div>
        <div className="flex items-center gap-5">
          <Button 
            type="reset" 
            variant="outline" 
            className="cursor-pointer"
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="cursor-pointer"
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