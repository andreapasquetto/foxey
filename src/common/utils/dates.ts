import {
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfToday,
  startOfYear,
  sub,
} from "date-fns";

interface DateRange {
  from: Date;
  to: Date;
}

export function thisMonthToDateRange(): DateRange {
  const today = startOfToday();
  return { from: startOfMonth(today), to: endOfDay(today) };
}

export function thisMonthRange(): DateRange {
  const today = startOfToday();
  return { from: startOfMonth(today), to: endOfMonth(today) };
}

export function lastMonthRange(): DateRange {
  const startOfLastMonth = startOfMonth(sub(startOfToday(), { months: 1 }));
  return {
    from: startOfLastMonth,
    to: endOfDay(endOfMonth(startOfLastMonth)),
  };
}

export function last30DaysRange(): DateRange {
  const today = startOfToday();
  return { from: sub(today, { days: 30 }), to: endOfDay(today) };
}

export function last90DaysRange(): DateRange {
  const today = startOfToday();
  return {
    from: sub(today, { months: 3 }),
    to: endOfDay(today),
  };
}

export function last365DaysRange(): DateRange {
  const today = startOfToday();
  return {
    from: sub(today, { years: 1 }),
    to: endOfDay(today),
  };
}

export function thisYearToDateRange(): DateRange {
  const today = startOfToday();
  return { from: startOfYear(today), to: endOfDay(today) };
}

export function thisYearRange(): DateRange {
  const today = startOfToday();
  return { from: startOfYear(today), to: endOfYear(today) };
}

export function lastYearRange(): DateRange {
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

export function getDateRangeFromCode(code: DateRangePresetCode): { from: undefined } | DateRange {
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
      return { from: undefined };
  }
}
