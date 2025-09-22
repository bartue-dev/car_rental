import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import type { DeleteBookingAlertAdminPropsType } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/use-axios-private";

//DeleteBookingAlert Component
export default function DeleteBookingAlert({
  bookingId,
  setIsDeleteDialogOpen
} : DeleteBookingAlertAdminPropsType) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  //deleteBookingAdmin useMutation
  const {
    mutate: deleteBookingAdmin
  } = useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.delete(`/v1/booking-admin/${bookingId}`)

      setIsDeleteDialogOpen(false)

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"]})
    }
  })

  /* delete booking function */
  const handleDeleteBooking = () => {
    deleteBookingAdmin()
  }
  return (
    <AlertDialogContent className="font-poppins">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will delete 
          Booking Details if you click continue.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="cursor-pointer"
          onClick={handleDeleteBooking}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}