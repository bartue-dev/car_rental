import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import type { PickupDateTimePropsTypes } from "@/lib/types"

export default function PickupDateTime({
  pickupDate,
  pickupTime,
  setPickupDate,
  register,
  setValue
} : PickupDateTimePropsTypes) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-32 justify-between font-normal"
            >
              {typeof pickupDate === "object" ? pickupDate.toLocaleDateString() : typeof pickupDate === "string" ? pickupDate : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={pickupDate}
              captionLayout="dropdown"
              onSelect={(pickupDate) => {
                if (pickupDate) {
                  setPickupDate(pickupDate)
                  setValue("pickupDate", pickupDate, { shouldValidate: true })
                  setOpen(false)
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time"
          step="1"
          defaultValue={pickupTime || "12:00:00"}
          {...register("pickupTime")}
          name="pickupTime"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}