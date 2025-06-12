import { PickupDateTime } from "./subComponents/dateTime";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

function BookingForm() {
  const [errMsg, setErrMsg] = useState({});
  const [pickupDate, setPickupDate] = useState(undefined);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let validationMsg = {};
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

      const pickupDateTime = `${format(new Date(pickupDate), "MM/dd/yyyy")}, ${formData.get("pickupTime")}`
      if (pickupDate <= new Date()) {
        validationMsg.pickupDate = "Date must be today or later"
      }

      if (Object.keys(validationMsg).length > 0) {
        setErrMsg(validationMsg);
        return;
      }

      setErrMsg({});
      setPickupDate(undefined);

      //backend
      const response = await axiosPrivate.post("/v1/booking",
        {firstName, lastName, address, phoneNumber, pickupDateTime}
      );

      console.log("BOOKING RESPONSE:", response)

      toast.success("Booking information submit successfully")

      e.target.reset();
    } catch (error) {
      console.error(error)

      if (error?.name === "RangeError") {
        setErrMsg(prev => ({...prev, pickupDate: "Invalid Date"}))
      }

      if (error?.status === 403) {
        navigate("/login", { state: { from: location }, replace:true })
      }
    }
  }

  return (
    <div className="border py-3 rounded-md shadow-md">
      <Toaster position="top-center"/>
      <h1 className="place-self-center">BOOKING FORM</h1>
      <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Label htmlFor="firstName">Firstname:</Label>
          <Input id="firstName" type="text" name="firstName" className="border-gray-300"/>
          {errMsg && <p className="text-xs text-red-500">{errMsg.firstName}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="lastName">Lastname:</Label>
          <Input id="lastName" type="text" name="lastName" className="border-gray-300"/>
          {errMsg && <p className="text-xs text-red-500">{errMsg.lastName}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="address">Address:</Label>
          <Input id="address" type="text" name="address" className="border-gray-300"/>
          {errMsg && <p className="text-xs text-red-500">{errMsg.address}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="phoneNumber">Phone #:</Label>
          <Input id="phoneNumber" type="tel" name="phoneNumber" className="border-gray-300"/>
          {errMsg && <p className="text-xs text-red-500">{errMsg.phoneNumber}</p>}
        </div>
        <div>
          <fieldset className="border rounded-md p-3 border-gray-300 shadow-xs">
            <legend>Select Pickup</legend>
            <PickupDateTime 
              pickupDate={pickupDate} 
              setPickupDate={setPickupDate} 
            />
            {errMsg && <p className="text-xs text-red-500 mt-4">{errMsg.pickupDate}</p>}
          </fieldset>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm;