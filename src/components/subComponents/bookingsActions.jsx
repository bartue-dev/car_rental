import { Ellipsis, PencilLine, Trash2, ListCollapse } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
} from "@/components/ui/dialog"

import {
  AlertDialog,
} from "@/components/ui/alert-dialog"

import { useState } from "react"
import { EditFormDialog } from '../dashboard/editFormDialog';
import { DeleteBookingAlert } from '../dashboard/deleteBookingAlert';
import BookingDetails from '../dashboard/bookingDetails';

function BookingActions({setBookings, vehicles, ...booking}) {
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, SetIsDeleteDialogOpen] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer"><Ellipsis/></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
            <DropdownMenuItem 
            className="flex justify-between cursor-pointer"
            onClick={() => setIsBookingDetailsOpen(true)}
            >
            Details
            <ListCollapse  />
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex justify-between cursor-pointer"
            onClick={() => setIsEditDialogOpen(true)}
            >
            Edit
            <PencilLine />
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex justify-between cursor-pointer"
            onClick={() => SetIsDeleteDialogOpen(true)}
          >
            Delete    
            <Trash2 />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Booking details dialog */}
      <Dialog open={isBookingDetailsOpen} onOpenChange={setIsBookingDetailsOpen} >
        <BookingDetails
          {...booking}
          setIsBookingDetailsOpen={setIsBookingDetailsOpen}
        />
      </Dialog>

      {/* Edit form dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <EditFormDialog
          {...booking}
          vehicles={vehicles}
          setBookings={setBookings}
          setIsEditDialogOpen={setIsEditDialogOpen}
        />
      </Dialog>

      {/* Delete alert dialog confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={SetIsDeleteDialogOpen}>
        <DeleteBookingAlert
          {...booking}
          setBookings={setBookings}
          setIsDeleteDialogOpen={SetIsDeleteDialogOpen}
        />
      </AlertDialog> 
    </div>
  )
}

export default BookingActions;