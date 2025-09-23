import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Mail, Phone, MapPin, LoaderCircle } from 'lucide-react';
import { Toaster, toast } from "sonner";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//ContactSchema
const ContactSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"),
  message: z.string().min(1, "Message cannot be empty")
});

//Infer ContactSchema to ContactData type
type ContactData = z.infer<typeof ContactSchema>

//ContactUs Compnent
export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset
  } = useForm<ContactData>({
    resolver: zodResolver(ContactSchema)
  });

  //mock up contact submission
  const onSubmit = (data: ContactData) => {
    try {
      console.group("Contact Us Data")
        console.log("Name:", data.name)
        console.log("Email:", data.email)
        console.log("Message:", data.message)
      console.groupEnd()

      toast.success("Message sent successfully")

      reset()  
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex gap-20 items-center bg-white px-30 p-6 mt-20">
      <Toaster position="top-center"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl" >Contact Us</h1>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className=" flex flex-col gap-2">
            <Input 
              type="text"
              placeholder="Name"
              {...register("name")}
              className="shadow-xs" 
            />
            {errors?.name && <p className="text-xs text-red-600">{errors?.name?.message}</p>}
          </div>
          <div className=" flex flex-col gap-2">
            <Input 
              type="email"
              placeholder="Email Adress"
              {...register("email")}
              className="shadow-xs" 
            />
            {errors?.email && <p className="text-xs text-red-600">{errors?.email?.message}</p>}
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Textarea 
              placeholder="Message" 
              {...register("message")} 
              className="shadow-xs resize-none h-30"
            />
            {errors?.message && <p className="text-xs text-red-600">{errors?.message.message}</p>}
          </div>
          <Button  
            className="col-start-2 bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 cursor-pointer"
            type="submit"
            disabled={isSubmitting}
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