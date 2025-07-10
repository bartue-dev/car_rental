import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
import useAxiosPrivate from "@/hooks/useAxiosPrivate"

export function EditFormDialogVehicle({setVehicles, ...vehicle}) {
  const [getStatus, setStatus] = useState(vehicle.status);
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData(e.target);
      
      const name = formData.get("name");
      const type = formData.get("type");
      const price = formData.get("price")
      const status = getStatus;
      const file = formData.get("file")
      
      const vehicleData = (await axiosPrivate.put(`/v1/vehicle-admin/${vehicle.vehicleId}`,
        {name, type, price, status, vehicleId: vehicle.vehicleId}
      ))?.data?.data?.vehicleDetails

      let imageData;
      if (file.name) {
        console.log("FILE UPLOADED")
        imageData = (await axiosPrivate.put(`/v1/images-admin/${vehicle.images[0]?.imageId}/vehicle/${vehicle.vehicleId}`, 
          {file},
          {headers: {"Content-Type": "multipart/form-data"}}
        )).data?.data?.imageDetails;
      } else {
        imageData = vehicle.images[0];
      }

      const data = {...vehicleData.data?.data?.vehicleDetails, images: [imageData]};

      setVehicles(prev => (
        prev.map((item) => {
          return item.vehicleId === vehicle.vehicleId 
            ? {
              ...item,
              ...data
            }
            : item 
        })
      ))
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <Dialog>
        <DialogTrigger asChild>
          <div>
            Update
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle>Edit Vehicle Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={vehicle.name.charAt(0).toUpperCase() + vehicle.name.slice(1)} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="type">Type</Label>
                <Input id="type" name="type" defaultValue={vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="status">Status</Label>
                <Select 
                  id="status" 
                  defaultValue={getStatus} 
                  onValueChange={(value) => {setStatus(value)}}
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
                <Input id="price" name="price" defaultValue={vehicle.price} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="file">Image</Label>
                <div className="text-sm ml-1">
                  {vehicle.images[0]?.name}
                </div>
                <Input 
                  type="file" 
                  id="file" 
                  name="file" 
                  accept="image/*"
                  className="cursor-pointer"/>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}
