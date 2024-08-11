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

export function monthToDateRange(): DateRange {
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

export function yearToDateRange(): DateRange {
  return { from: startOfYear(startOfToday()), to: endOfDay(startOfToday()) };
}

export function lastYearRange(): DateRange {
  const startOfLastYear = startOfYear(sub(startOfToday(), { years: 1 }));
  return {
    from: startOfLastYear,
    to: endOfDay(endOfYear(startOfLastYear)),
  };
}

export type DateRangePresetCode =
  | "month-to-date"
  | "last-month"
  | "last-3-months"
  | "year-to-date"
  | "last-year";

export function getDateRangeFromCode(code: DateRangePresetCode): DateRange {
  switch (code) {
    case "month-to-date":
      return monthToDateRange();
    case "last-month":
      return lastMonthRange();
    case "last-3-months":
      return lastThreeMonthsRange();
    case "year-to-date":
      return yearToDateRange();
    case "last-year":
      return lastYearRange();
  }
}
