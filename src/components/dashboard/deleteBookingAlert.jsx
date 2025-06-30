import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import useAxiosPrivate from '@/hooks/useAxiosPrivate';

export function DeleteBookingAlert({bookingId, setBookings, setIsDeleteDialogOpen}) {
  const axiosPrivate = useAxiosPrivate();

  /* delete booking function */
  const handleDeleteBooking = async (e) => {
    e.preventDefault();

    try {
      await axiosPrivate.delete(`/v1/booking-admin/${bookingId}`)

      console.log("BOOKING DELETED!");

      setBookings(prev => (
        prev.filter(item => {
          return item.bookingId !== bookingId
        })
      ))

      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <AlertDialogContent>
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
