"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEventsGetAllQuery } from "@/modules/events/events-queries";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MapPin,
} from "lucide-react";
import { useState } from "react";

export function MonthCalendar() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(today);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(selectedMonth), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(selectedMonth), { weekStartsOn: 1 }),
  });

  const eventsQuery = useEventsGetAllQuery();

  const events = eventsQuery.data ?? [];

  const eventsForSelectedDay = events.filter((event) => isSameDay(selectedDay, event.datetime));

  function goToPreviousMonth() {
    setSelectedMonth(add(selectedMonth, { months: -1 }));
  }

  function goToPreviousYear() {
    setSelectedMonth(add(selectedMonth, { years: -1 }));
  }

  function goToNextMonth() {
    setSelectedMonth(add(selectedMonth, { months: 1 }));
  }

  function goToNextYear() {
    setSelectedMonth(add(selectedMonth, { years: 1 }));
  }

  function goToCurrentMonthOrSelectToday() {
    if (isSameMonth(today, selectedMonth)) {
      setSelectedDay(today);
    } else {
      setSelectedMonth(startOfMonth(today));
    }
  }

  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-2">
      <section className="lg:col-span-2">
        <header className="flex items-center justify-between py-3 lg:flex-none">
          <div className="text-xl font-semibold tracking-tight">
            <time dateTime={format(selectedMonth, "y-MM")}>
              {format(selectedMonth, "MMMM yyyy")}
            </time>
          </div>
          <div className="flex items-center gap-0.5 rounded-md md:items-stretch">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-r-none"
              onClick={() => goToPreviousYear()}
            >
              <ChevronsLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-none"
              onClick={() => goToPreviousMonth()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="hidden rounded-none md:inline-flex"
              onClick={() => goToCurrentMonthOrSelectToday()}
            >
              Today
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-none"
              onClick={() => goToNextMonth()}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-l-none"
              onClick={() => goToNextYear()}
            >
              <ChevronsRight className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <div className="rounded-md border lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px text-center text-xs/6 font-semibold lg:flex-none">
            <div className="py-2">
              M<span className="sr-only sm:not-sr-only">ON</span>
            </div>
            <div className="py-2">
              T<span className="sr-only sm:not-sr-only">UE</span>
            </div>
            <div className="py-2">
              W<span className="sr-only sm:not-sr-only">ED</span>
            </div>
            <div className="py-2">
              T<span className="sr-only sm:not-sr-only">HU</span>
            </div>
            <div className="py-2">
              F<span className="sr-only sm:not-sr-only">RI</span>
            </div>
            <div className="py-2">
              S<span className="sr-only sm:not-sr-only">AT</span>
            </div>
            <div className="py-2">
              S<span className="sr-only sm:not-sr-only">UN</span>
            </div>
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-0.5 p-0.5 text-xs/6">
            {days.map((day) => {
              const dayEvents = events.filter((event) => isSameDay(day, event.datetime));
              return (
                <button
                  key={day.toLocaleDateString()}
                  type="button"
                  className={cn(
                    "flex h-10 flex-col items-center justify-center rounded-md hover:bg-foreground/10 focus:z-10 dark:hover:bg-foreground/10 sm:h-20 sm:items-start sm:justify-normal sm:p-1.5 lg:h-24",
                    {
                      "bg-muted dark:bg-muted/40": isSameMonth(selectedMonth, day),
                      "opacity-25": !isSameMonth(selectedMonth, day),
                      "text-red-500 dark:text-red-600":
                        !isSameDay(day, selectedDay) && isToday(day),
                    },
                  )}
                  onClick={() => setSelectedDay(day)}
                >
                  <time
                    dateTime={format(day, "y-MM-dd")}
                    className={cn("leading-none sm:ml-auto", {
                      "flex size-6 items-center justify-center rounded-md": isSameDay(
                        day,
                        selectedDay,
                      ),
                      "bg-red-500 font-semibold text-background dark:bg-red-600 dark:text-foreground":
                        isSameDay(day, selectedDay) && isToday(day),
                      "bg-foreground text-background": isSameDay(day, selectedDay) && !isToday(day),
                    })}
                  >
                    {format(day, "dd")}
                  </time>
                  <span className="sr-only">{dayEvents.length} events</span>
                  {dayEvents.length > 0 && (
                    <>
                      <span className="mt-auto hidden items-center gap-1 sm:flex md:hidden">
                        {dayEvents.length > 1 && (
                          <span className="leading-none">{dayEvents.length}</span>
                        )}
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground"></span>
                      </span>
                      <ol className="mt-2 hidden w-full md:block">
                        {dayEvents.slice(0, 2).map((event) => (
                          <li key={event.id}>
                            <div className="flex justify-between gap-3">
                              <p
                                className={cn("truncate font-medium text-muted-foreground", {
                                  "line-through": event.isCanceled,
                                })}
                              >
                                {event.title}
                              </p>
                              <time
                                dateTime={format(event.datetime, "HH:mm")}
                                className="hidden text-muted-foreground/50 xl:block"
                              >
                                {format(event.datetime, "HH:mm")}
                              </time>
                            </div>
                          </li>
                        ))}
                        {dayEvents.length > 2 && (
                          <li className="text-muted-foreground">+ {dayEvents.length - 2} more</li>
                        )}
                      </ol>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <div className="py-5 text-center text-xl font-semibold tracking-tight">
          Events for{" "}
          <time dateTime={format(selectedDay, "y-MM-dd")}>
            {format(selectedDay, "ccc, dd MMM y")}
          </time>
        </div>
        {!!eventsForSelectedDay.length && (
          <ul className="grid sm:grid-cols-2 lg:flex lg:flex-col lg:gap-2">
            {eventsForSelectedDay.map((event) => (
              <li
                key={event.id}
                className="space-y-2 rounded-lg border p-3 text-left transition-all"
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn("text-lg font-semibold tracking-tight", {
                          "line-through": event.isCanceled,
                        })}
                      >
                        {event.title}
                      </div>
                    </div>
                    <div className="ml-auto text-xs text-foreground">
                      {event.isAllDay ? "ALL DAY" : format(event.datetime, "HH:mm")}
                    </div>
                  </div>
                </div>
                {event.description && (
                  <div className="line-clamp-2 text-xs text-muted-foreground">
                    {event.description}
                  </div>
                )}
                {event.place && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-2 text-xs leading-none">{event.place.name}</span>
                  </div>
                )}
                <div className="flex items-center">
                  {event.category && <Badge>{event.category.name}</Badge>}
                  {isBefore(selectedDay, today) && (
                    <div className="ml-auto">
                      <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {!eventsForSelectedDay.length && (
          <p className="text-center text-sm text-muted-foreground">There are no events.</p>
        )}
      </section>
    </div>
  );
}
