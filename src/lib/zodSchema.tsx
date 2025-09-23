import { z } from "zod"

export const BookingSchema = z.object({
  firstName: z.string().min(1, "Firstname must not be empty").regex(/^[a-zA-Z\s]+$/, "Firstname must be characters only"),
  lastName: z.string().min(1, "Lastname must not be empty").regex(/^[a-zA-Z\s]+$/, "Firstname must be characters only"),
  address: z.string().min(1, "Address must bot be empty"),
  phoneNumber: z.string().regex(/^(\+\d{12}|\d{11})$/, "Invalid Phone number"),
  pickupDate: z.date("Invalid Date"),
  pickupTime: z.string(),
  pickupDateTime: z.string(),
  status: z.string().optional()
}).superRefine(({pickupDate}, ctx) => { //custom conditional validation
  const today = new Date().setHours(0, 0, 0, 0);
  const selectedDate = new Date(pickupDate).setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    console.log("Date must be today or later")
    ctx.addIssue({
      code: "custom",
      message: "Date must be today or later",
      path: ["pickupDate"]
    })
  }
})