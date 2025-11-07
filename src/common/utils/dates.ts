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

export const IGNORE_DOB_YEAR = 1500;

export function thisMonthToDateRange(): Required<DateRange> {
  const today = startOfToday();
  return { from: startOfMonth(today), to: endOfDay(today) };
}

export function thisMonthRange(): Required<DateRange> {
  const today = startOfToday();
  return { from: startOfMonth(today), to: endOfMonth(today) };
}

export function lastMonthRange(): Required<DateRange> {
  const startOfLastMonth = startOfMonth(sub(startOfToday(), { months: 1 }));
  return {
    from: startOfLastMonth,
    to: endOfDay(endOfMonth(startOfLastMonth)),
  };
}

export function last30DaysRange(): Required<DateRange> {
  const today = startOfToday();
  return { from: sub(today, { days: 30 }), to: endOfDay(today) };
}

export function last90DaysRange(): Required<DateRange> {
  const today = startOfToday();
  return {
    from: sub(today, { months: 3 }),
    to: endOfDay(today),
  };
}

export function last365DaysRange(): Required<DateRange> {
  const today = startOfToday();
  return {
    from: sub(today, { years: 1 }),
    to: endOfDay(today),
  };
}

export function thisYearToDateRange(): Required<DateRange> {
  const today = startOfToday();
  return { from: startOfYear(today), to: endOfDay(today) };
}

export function thisYearRange(): Required<DateRange> {
  const today = startOfToday();
  return { from: startOfYear(today), to: endOfYear(today) };
}

export function lastYearRange(): Required<DateRange> {
  const startOfLastYear = startOfYear(sub(startOfToday(), { years: 1 }));
  return {
    from: startOfLastYear,
    to: endOfDay(endOfYear(startOfLastYear)),
  };
}

export type DateRangePresetCode =
  | "mtd"
  | "last-month"
  | "last-90-days"
  | "ytd"
  | "last-year"
  | "all-time";

export function getDateRangeFromCode(code: DateRangePresetCode): DateRange {
  switch (code) {
    case "mtd":
      return thisMonthToDateRange();
    case "last-month":
      return lastMonthRange();
    case "last-90-days":
      return last90DaysRange();
    case "ytd":
      return thisYearToDateRange();
    case "last-year":
      return lastYearRange();
    case "all-time":
      return { from: undefined, to: undefined };
  }
}
