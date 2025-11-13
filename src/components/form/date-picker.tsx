import { format, setHours, setMinutes } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: Date | undefined;
  setValue: (value: Date | undefined) => void;
  includeTime?: boolean;
}

export function DatePicker(props: DatePickerProps) {
  const [time, setTime] = useState(format(props.value ?? new Date(), "HH:mm"));

  function onDateChange(newDate: Date | undefined) {
    if (!newDate || !props.includeTime) {
      props.setValue(newDate);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    props.setValue(
      new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
        hours,
        minutes,
      ),
    );
  }

  function onTimeChange(event: ChangeEvent<HTMLInputElement>) {
    if (!props.includeTime || !props.value) {
      return;
    }

    const newTime = event.target.value;
    setTime(newTime);

    const [hours, minutes] = newTime.split(":").map((str) => parseInt(str, 10));
    const newValue = setHours(setMinutes(props.value, minutes), hours);
    props.setValue(newValue);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !props.value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {props.value ? (
            props.includeTime ? (
              format(props.value, "dd MMM y HH:mm")
            ) : (
              format(props.value, "dd MMM y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={props.value}
          onSelect={onDateChange}
          autoFocus
          weekStartsOn={1}
          captionLayout="dropdown"
        />
        {props.includeTime && (
          <div className="p-3 pt-0 text-center">
            <input
              type="time"
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              value={time}
              onChange={onTimeChange}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
