import type { BookingData } from "@/components/home/booking-form";
import React, { type ReactNode, type RefObject } from "react";
import type {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormSetValue
} from "react-hook-form"

/* auth-provider types */
export type AuthProviderProps = {
  children: ReactNode;
}

export type AuthType = {
  username?: string;
  accessToken?: string;
  role?: string;
  accountId?: string;
}

export type UserType = {
  username?: string,
  role?: string
}

export type AuthContextType = {
  auth: AuthType,
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>, 
  user: UserType | null,
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>,
  authLoading: boolean
}
/* ---------- */


/* Register types */
type RegisterData = {username: string, password: string}

export type RegisterPropsType = {
  onSubmit: (data : RegisterData) => void,
  handleSubmit: UseFormHandleSubmit<RegisterData>,
  register: UseFormRegister<RegisterData>,
  errors: FieldErrors<RegisterData>
  isSubmitting: boolean,
  serverError: {error?: string}
}

export type ApiError = {
  status?: number,
  response?: {
    status?: number,
    data?: {
      message?: string
      errors?: {
        error: string
      }
    }
  }
  name?: string
  code?: string,
  message?: string,
}
/* --------- */

/* Login types */
type LoginData = {username: string, password: string}

export type LoginPropsType = {
  onSubmit: (data: LoginData) => void,
  handleSubmit: UseFormHandleSubmit<LoginData>,
  register: UseFormRegister<LoginData>,
  errors: FieldErrors<LoginData>,
  isSubmitting: boolean,
  serverError: {error?: string}
  formRef: RefObject<HTMLFormElement | null>
}
/* -------- */

/* vehicles types */
export type GetAllVehiclesTypes = {
  vehicleId: string,
  name?: string,
  status?: string,
  price?: string,
  type?: string,
  images: {
    url: string
  }[]
}
/* -------- */

/* vehicle-pagination props types */
export type VehiclePaginationPropsTypes = {
  currentPage: number,
  totalPage: number,
  itemsRender: (page: number) => void
}
/* -------- */

/* home-testimonials props types */
export type SelectedTestimonialsTypes = {
  testimonial: {
    content: string | undefined,
    user: { username: string | undefined},
  }
}
/* --------- */

/* PickupDateTime */
export type PickupDateTimePropsTypes = {
  pickupDate: Date,
  setPickupDate: (pickupDate: Date) => void
  pickupTime?: string
  register?: UseFormRegister<BookingData>
  setValue?: UseFormSetValue<BookingData>
  
}
/* --------- */

/* Booking form component */
export type UserBookingsTypes = {
  bookingId: string,
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  pickupDateTime: string,
  status: string,
  vehicleId?: string,
  vehicle: {
    name: string,
    price: number
  }
}
/* --------- */

/* DataSummary Component */
export type SummaryDataTypes = {
  vehicles: number,
  bookings: number,
  testimonials: number
}
/* ----- */


/* RecentBookings Component */
export type RecentBookingsTypes = {
  bookingId: string,
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  status: string
}
/* -------- */

/* BookingTable Component, Admin */
export type BookingsAdminTypes = {
  bookingDetails: RecentBookingsTypes[]
  vehicles: GetAllVehiclesTypes[]
}
/* --------- */

/* Booking Action */
export type BookingActionsPropsTypes = {
  bookingId: string,
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  status: string
}
/* --------- */

/* EditFormDialog Admin */
export type EditBookingsDialogAdmin = {
  bookingId: string,
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  pickupDateTime?: string,
  status: string,
  vehicleId?: string,
  vehicle?: {
    name: string,
    price: number
  }
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
/* --------- */

/* DeleteBookingAlert Admin */
export type DeleteBookingAlertAdminPropsType = {
  bookingId: string,
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}
/* --------- */

/* BookingFormAdmin component */
export type BookingFormAdmin = {
  vehicleId: string,
  setVehicleId: (value: string) => void
}

/* --------- */