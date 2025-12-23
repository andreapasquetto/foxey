"use field";

import { format, setHours, setMinutes } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { type ChangeEvent, useId, useState } from "react";
import {
  type Control,
  type FieldPathByValue,
  type FieldValues,
  useController,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function XNullableDatePickerField<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, Date | null>,
>({
  control,
  name,
  id,
  includeTime,
  label,
  description,
}: {
  control: Control<TFieldValues>;
  name: TPath;
  id?: string;
  includeTime?: boolean;
  label?: string;
  description?: string;
}) {
  const { field, fieldState } = useController({
    control,
    name,
  });
  const [time, setTime] = useState(format(field.value ?? new Date(), "HH:mm"));

  const defaultId = useId();
  const fieldId = id ?? defaultId;

  function onDateChange(newDate: Date | undefined) {
    if (!newDate) {
      field.onChange(null);
      return;
    }

    if (!includeTime) {
      field.onChange(newDate);
      return;
    }

    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    field.onChange(
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
    if (!field.value || !includeTime) return;

    const newTime = event.target.value;
    setTime(newTime);

    const [hours, minutes] = newTime.split(":").map((str) => parseInt(str, 10));
    field.onChange(setHours(setMinutes(field.value, minutes), hours));
  }

  return (
    <Field data-invalid={fieldState.invalid}>
      {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
      <Popover>
        <div className="flex items-center gap-1">
          <div className="flex-1">
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start gap-2 text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
                aria-invalid={fieldState.invalid}
              >
                <CalendarIcon className="shrink-0 text-muted-foreground" />
                {field.value ? (
                  includeTime ? (
                    format(field.value, "dd MMM y HH:mm")
                  ) : (
                    format(field.value, "dd MMM y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
          </div>
          {field.value && (
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => field.onChange(null)}
                  >
                    <X />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={onDateChange}
            autoFocus
            weekStartsOn={1}
            captionLayout="dropdown"
          />
          {includeTime && (
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
      {description && <FieldDescription>{description}</FieldDescription>}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
