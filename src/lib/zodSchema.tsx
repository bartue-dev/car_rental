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
});

//Edit Vehicle Schema
export const EditVehicleSchema = z.object({
  name: z.string().min(1, "Vehicle name must not be empty"),
  type: z.string().min(1, "Vehicle type must not be empty"),
  price: z.number("Invalid Price"),
  status: z.string(),
  file: z.any()
        .optional()
        .refine((file) => {
      // If no file is provided, it's valid (optional)
      if (!file || file.length === 0) return true;
      // If file is provided, validate it
      if (file[0]) {
        return ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg"].includes(file[0].type);
      }
      return false;
    }, "Invalid Image, Only jpeg, jpg, png and webp are allowed")
})

//Vehicle Schema
export const VehicleSchema = z.object({
  name: z.string().min(1, "Vehicle name must not be empty"),
  type: z.string().min(1, "Vehicle type must not be empty"),
  price: z.number("Invalid Price"),
  status: z.string(),
  file: z.any()
        .refine((files) => files?.length == 1, "Image is required.")
        .refine((file) => {
        // If file is provided, validate it
        if (file[0]) {
          return ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg"].includes(file[0].type);
        }
        return false;
      }, "Invalid Image, Only jpeg, jpg, png and webp are allowed")
})