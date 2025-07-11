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
import { useState } from "react"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { Loader2Icon } from "lucide-react"

function VehicleForm() {
  const [getStatus, setStatus] = useState("Available");
  const [errMsg, setErrMsg] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const allowedImgTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg"]

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true)

    try {
      let validationMsg = {}
      const formData = new FormData(e.target);

      console.log("FORMDATA: ", Object.fromEntries(formData))

      const name = formData.get("name");
      if (name.length <= 2) {
        validationMsg.name = "Name should be atleast more than 2 characters"
      }

      const type = formData.get("type");
      if (type.length <= 2) {
        validationMsg.type = "Type should be atleast more than 2 characters"
      }
    
      const price = Number(formData.get("price"));

      if (typeof price !== "number" || !price) {
        validationMsg.price = "Invalid price"
      }
      
      const file = formData.get("file");
      if (!allowedImgTypes.includes(file.type)) {
        validationMsg.file = "Invalid image"
      }

      const status = getStatus;
      if (!status) {
        validationMsg.status = "Invalid Status"
      }


      if (Object.keys(validationMsg).length > 0) {
        return setErrMsg(validationMsg);
      }

      setErrMsg({})

      //add the data in backend
      const vehicleResponse = (await axiosPrivate.post("/v1/vehicle-admin", {
        name, type, status, price
      }))?.data?.data?.vehicleDetails;

      console.log("VEHICLE RESPONSE:", vehicleResponse);

      const imageFormData = new FormData();
      imageFormData.append("file", file)

      await axiosPrivate.post(`/v1/images-admin/vehicle/${vehicleResponse.vehicleId}`, 
        imageFormData,
        {headers: {"Content-Type": "multipart/form-data"}}
      );

      toast.success("Vehicle added successfully")
      e.target.reset();

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border rounded-md shadow-sm py-5 px-3 max-w-200">
      <Toaster position="top-center"/>
      <h1 className="place-self-center">VEHICLE FORM</h1>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4"
      >
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" />
          {errMsg.name && <p className="text-xs text-red-600"> {errMsg.name} </p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="type">Type</Label>
          <Input id="type" name="type" type="text" />
          {errMsg.type && <p className="text-xs text-red-600"> {errMsg.type} </p>}
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
          {errMsg.status && <p className="text-xs text-red-600">{errMsg.status}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" />
          {errMsg.price && <p className="text-xs text-red-600"> {errMsg.price} </p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="file">Image</Label>
          <Input 
            id="file" 
            name="file" 
            type="file" 
            accept="image/*"
            className="cursor-pointer"
          />
          {errMsg.file && <p className="text-xs text-red-600"> {errMsg.file} </p>}
        </div>
        <div className="flex items-center gap-5">
          <Button type="reset" variant="outline" >Cancel</Button>
          {isLoading
            ? <Button size="sm" disabled>
                <Loader2Icon className="animate-spin" />
                Please wait
              </Button>
            : <Button type="submit">Save changes</Button>}
          
          
        </div>
      </form>
    </div>
  )
}

export default VehicleForm;