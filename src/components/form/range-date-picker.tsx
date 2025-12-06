import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type * as React from "react";
import type { DateRange } from "react-day-picker";
import {
  type DateRangePresetCode,
  getDateRangeFromCode,
} from "@/common/utils/dates";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface RangeDatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  dateRange: DateRange | undefined;
  setDateRange: (value: DateRange | undefined) => void;
  showPresets?: boolean;
}

export function RangeDatePicker({
  className,
  dateRange,
  setDateRange,
  showPresets,
}: RangeDatePickerProps) {
  function onSelectDateRangePreset(code: DateRangePresetCode) {
    setDateRange(getDateRangeFromCode(code));
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "shrink justify-start overflow-hidden text-left font-normal",
              (!dateRange || (!dateRange.from && !dateRange.to)) &&
                "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 shrink-0" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd MMM y")} -{" "}
                  {format(dateRange.to, "dd MMM y")}
                </>
              ) : (
                format(dateRange.from, "dd MMM y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-auto flex-col space-y-2 p-2"
          align="start"
        >
          {showPresets && (
            <Select onValueChange={onSelectDateRangePreset}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preset" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="mtd">Month to date (MTD)</SelectItem>
                <SelectItem value="last-month">Last month</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="ytd">Year to date (YTD)</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
                <SelectItem value="all-time">All-time</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            weekStartsOn={1}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
