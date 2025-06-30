import { Ellipsis, PencilLine, Trash2 } from 'lucide-react';

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

function BookingActions({setBookings, ...booking}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, SetIsDeleteDialogOpen] = useState(false)

  

  return (
    <div>
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={SetIsDeleteDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer"><Ellipsis/></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
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
      {/* Edit form dialog */}
      <EditFormDialog
        {...booking}
        setBookings={setBookings}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />
       <DeleteBookingAlert
        {...booking}
        setBookings={setBookings}
        setIsDeleteDialogOpen={SetIsDeleteDialogOpen}
       />
      </AlertDialog> 
    </Dialog>
    </div>
  )
}

export default BookingActions;