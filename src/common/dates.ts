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

export function thisMonthToDateRange(): DateRange {
  return { from: startOfMonth(startOfToday()), to: endOfDay(startOfToday()) };
}

export function lastMonthRange(): DateRange {
  const startOfLastMonth = startOfMonth(sub(startOfToday(), { months: 1 }));
  return {
    from: startOfLastMonth,
    to: endOfDay(endOfMonth(startOfLastMonth)),
  };
}

export function lastThreeMonthsRange(): DateRange {
  return {
    from: startOfMonth(sub(startOfToday(), { months: 3 })),
    to: endOfDay(startOfToday()),
  };
}

export function thisYearToDateRange(): DateRange {
  return { from: startOfYear(startOfToday()), to: endOfDay(startOfToday()) };
}

export function thisYearRange(): DateRange {
  return { from: startOfYear(startOfToday()), to: endOfYear(startOfToday()) };
}

export function lastYearRange(): DateRange {
  const startOfLastYear = startOfYear(sub(startOfToday(), { years: 1 }));
  return {
    from: startOfLastYear,
    to: endOfDay(endOfYear(startOfLastYear)),
  };
}

export type DateRangePresetCode =
  | "this-month-to-date"
  | "last-month"
  | "last-3-months"
  | "this-year-to-date"
  | "this-year"
  | "last-year"
  | "all-time";

export function getDateRangeFromCode(code: DateRangePresetCode): DateRange {
  switch (code) {
    case "this-month-to-date":
      return thisMonthToDateRange();
    case "last-month":
      return lastMonthRange();
    case "last-3-months":
      return lastThreeMonthsRange();
    case "this-year-to-date":
      return thisYearToDateRange();
    case "this-year":
      return thisYearRange();
    case "last-year":
      return lastYearRange();
    case "all-time":
      return { from: undefined };
  }
}
