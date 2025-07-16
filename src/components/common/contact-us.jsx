import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Mail, Phone, MapPin } from 'lucide-react';
import { Toaster, toast } from "sonner";

import { useState } from "react";

function ContactUs() {
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [errMsg, setErrMsg] = useState({});

  const handleOnSubmit = (e) => {
    e.preventDefault();

    try {
      let validationMsg = {}

      const formData = new FormData(e.target);

      const name = formData.get("name");
      if (name.length <= 0) {
        validationMsg.name = "Name cannot be empty"
      }

      const email = formData.get("email");
      if (!EMAIL_REGEX.test(email)) {
        validationMsg.email = "Invalid email"
      }

      const message = formData.get("message");
      if (message.length <= 0) {
        validationMsg.message = "Message cannot be empty"
      }
      
      if (Object.keys(validationMsg).length > 0) {
        setErrMsg(validationMsg)
        return;
      }

      setErrMsg({})

      toast.success("Message sent successfully")

    e.target.reset()  
    } catch (error) {
      console.error(error)
    }


    
  }

  return (
    <div className="flex gap-20 items-center bg-gray-100 px-30 p-6">
      <Toaster position="top-center"/>
      <form onSubmit={handleOnSubmit}>
        <h1 className="text-xl" >Contact Us</h1>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className=" flex flex-col gap-2">
            <Input type="text" placeholder="Name" name="name" className="shadow-md" />
            {errMsg.name && <p className="text-xs text-red-600">{errMsg.name}</p>}
          </div>
          <div className=" flex flex-col gap-2">
            <Input type="email" placeholder="Email Adress" name="email" className="shadow-md" />
            {errMsg.email && <p className="text-xs text-red-600">{errMsg.email}</p>}
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Textarea placeholder="Message" name="message" className=" shadow-md resize-none h-30"/>
            {errMsg.message && <p className="text-xs text-red-600">{errMsg.message}</p>}
          </div>
          <Button  
            className="col-start-2 bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 cursor-pointer"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-5">
        <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" className="flex items-center gap-2 cursor-pointer">
          <div className="bg-gray-400 rounded-full w-8 h-8 flex justify-center items-center">
            <Mail color="white" size={20}/>
          </div>
          <h1>EzRent@gmail.com</h1>
        </a>
        <div className="flex items-center gap-2">
          <div className="bg-gray-400 rounded-full w-8 h-8 flex justify-center items-center">
            <Phone color="white" size={20}/>
          </div>
          <h1>09105359425</h1>
        </div>
        <a href="https://www.google.com/maps/place/Poblacion,+Polomolok,+South+Cotabato/@6.2191889,125.0659659,16.25z/data=!4m6!3m5!1s0x32f79ac33698d331:0x69b4dba63a5ba78a!8m2!3d6.2196347!4d125.0663456!16s%2Fg%2F11byck40zn!5m1!1e3?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="flex items-center gap-2">
          <div className="bg-gray-400 rounded-full w-8 h-8 flex justify-center items-center">
            <MapPin color="white" size={20}/>
          </div>
          <h1>Poblacion Polomolok South Cotabato</h1>
        </a>
      </div>
    </div>
  )
}

export default ContactUs;