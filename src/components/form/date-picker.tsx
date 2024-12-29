import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, setHours, setMinutes } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps {
  value: Date | undefined;
  setValue: SelectSingleEventHandler;
  includeTime?: boolean;
}

export function DatePicker(props: DatePickerProps) {
  const [time, setTime] = useState(format(props.value ?? new Date(), "HH:mm"));

  function onDateChange(newDate: Date | undefined) {
    if (!newDate || !props.includeTime) {
      // @ts-expect-error
      props.setValue(newDate);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    // @ts-expect-error
    props.setValue(
      new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), hours, minutes),
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
    // @ts-expect-error
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
          <CalendarIcon className="mr-2 h-4 w-4" />
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
          initialFocus
          weekStartsOn={1}
        />
        {props.includeTime && (
          <div className="p-3 pt-0 text-center">
            <input
              type="time"
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={time}
              onChange={onTimeChange}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
