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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditVehicleSchema } from "@/lib/zodSchema"
import { LoaderCircle } from "lucide-react"
import useAxiosPrivate from "@/hooks/common/use-axios-private"

type EditVehicleData = z.infer<typeof EditVehicleSchema>

//EditVehicleDialog Component
export default function EditVehicleDialog({...vehicle}) {
  const [getStatus, setStatus] = useState(vehicle.status);
  const [open, setOpen] = useState(false)
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isSubmitting}
  } = useForm<EditVehicleData>({
    resolver: zodResolver(EditVehicleSchema),
    defaultValues: {
      name: vehicle.name.charAt(0).toUpperCase() + vehicle.name.slice(1),
      type: vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1),
      price: vehicle.price,
      status: vehicle.status,
      file: undefined
    }
  });


  const {
    mutate: editVehicle
  } = useMutation({
    mutationFn: async (data: EditVehicleData) => {
      const resVehicle = await axiosPrivate
        .put(`/v1/vehicle-admin/${vehicle.vehicleId}`,{
          name: data.name,
          type: data.type, 
          price: data.price, 
          status: getStatus, 
          vehicleId: vehicle.vehicleId
      });

      let resImage;
      if (data.file && data.file[0]) {
        const formData = new FormData();
        formData.append("file", data.file[0]);

        resImage = await axiosPrivate.put(
          `/v1/images-admin/${vehicle.images[0]?.imageId}/vehicle/${vehicle.vehicleId}`, 
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        resImage = vehicle.images[0];
      }


      const vehicleData = resVehicle?.data?.data?.vehicleDetails  
      const imageData = resImage.data?.data?.imageDetails 

      return {vehicleData, imageData}
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["vehicles"]})
      reset()
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const onSubmit = (data : EditVehicleData) => {
    console.log("USEFORM DATA:", data)
    if (!isSubmitting) {
      editVehicle(data)
      setOpen(false)
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          onClick={() => setOpen(true)}
        >
          <div>
            Update
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-127 lg:h-auto overflow-auto">
          <div className="grid grid-cols-2 gap-5">
            {errors?.name && <p className="text-xs text-red-600">{errors?.name?.message}</p>}
            {errors?.type && <p className="text-xs text-red-600">{errors?.type?.message}</p>}
            {errors?.price && <p className="text-xs text-red-600">{errors?.price?.message}</p>}
            {errors?.status && <p className="text-xs text-red-600">{errors?.status?.message}</p>}
            {errors?.file && <p className="text-xs text-red-600">{errors?.file?.message?.toString()}</p>}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle>Edit Vehicle Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  {...register("name")} 
                  // defaultValue={vehicle.name.charAt(0).toUpperCase() + vehicle.name.slice(1)} 
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="type">Type</Label>
                <Input 
                  id="type" 
                  {...register("type")} 
                  // defaultValue={vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} 
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue={getStatus}
                  onValueChange={(value) => {
                    setStatus(value)
                    setValue("status", value, { shouldValidate: true })
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
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input 
                  id="price" 
                  {...register("price", {valueAsNumber: true})}
                  type="number" 
                  // defaultValue={vehicle.price} 
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="file">Image</Label>
                <div className="text-sm ml-1">
                  {vehicle.images[0]?.name}
                </div>
                <Input 
                  type="file" 
                  id="file" 
                  {...register("file")} 
                  accept="image/*"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline"
                className="cursor-pointer"
                onClick={() => setOpen(false)}
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