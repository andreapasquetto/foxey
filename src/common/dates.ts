import {
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfToday,
  startOfYear,
  sub,
} from "date-fns";
import { DateRange } from "react-day-picker";

export type DateRangePresetCode =
  | "month-to-date"
  | "last-month"
  | "last-3-months"
  | "year-to-date"
  | "last-year";

export function getDateRangeFromCode(code: DateRangePresetCode): DateRange {
  const today = startOfToday();
  const startOfLastMonth = startOfMonth(sub(today, { months: 1 }));
  const startOfLastYear = startOfYear(sub(today, { years: 1 }));

  switch (code) {
    case "month-to-date":
      return { from: startOfMonth(today), to: endOfDay(today) };
    case "last-month":
      return {
        from: startOfLastMonth,
        to: endOfDay(endOfMonth(startOfLastMonth)),
      };
    case "last-3-months":
      return {
        from: startOfMonth(sub(today, { months: 3 })),
        to: endOfDay(today),
      };
    case "year-to-date":
      return { from: startOfYear(today), to: endOfDay(today) };
    case "last-year":
      return {
        from: startOfLastYear,
        to: endOfDay(endOfYear(startOfLastYear)),
      };
  }
}
