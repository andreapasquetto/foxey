"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Contact } from "@/db/types/contacts";
import { Event } from "@/db/types/events";
import { Place, PlaceCategory } from "@/db/types/places";
import { cn } from "@/lib/utils";
import { DeleteEvent } from "@/modules/events/components/dialogs/delete-event";
import { EventCreateForm } from "@/modules/events/components/forms/event-create-form";
import { eventsToggleCancel } from "@/modules/events/events-actions";
import {
  add,
  differenceInYears,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  sub,
} from "date-fns";
import {
  Cake,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eraser,
  MapPin,
  Plus,
  RotateCw,
} from "lucide-react";
import { useState } from "react";

export function MonthCalendar(props: {
  categories: PlaceCategory[];
  places: Place[];
  contacts: Contact[];
  events: Event[];
}) {
  const { categories, places, contacts, events } = props;

  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(startOfMonth(today));
  const [showCreateSheet, setShowCreateSheet] = useState(false);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(selectedMonth), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(selectedMonth), { weekStartsOn: 1 }),
  });

  const selectedDayEvents = events.filter((event) => isSameDay(selectedDay, event.datetime));
  const contactsWithDobs = contacts
    .filter((contact) => contact.dob)
    .map((contact) => ({ ...contact, dob: parse(contact.dob!, "yyyy-MM-dd", new Date()) }));
  const selectedDayBirthdays = contactsWithDobs.filter(
    (contact) =>
      selectedDay.getMonth() === contact.dob.getMonth() &&
      selectedDay.getDate() === contact.dob.getDate(),
  );

  function goToPreviousMonth() {
    setSelectedMonth(sub(selectedMonth, { months: 1 }));
  }

  function goToPreviousYear() {
    setSelectedMonth(sub(selectedMonth, { years: 1 }));
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
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
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
            <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
              <SheetTrigger asChild>
                <Button size="icon">
                  <Plus className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create Event</SheetTitle>
                </SheetHeader>
                <EventCreateForm
                  categories={categories}
                  places={places}
                  selectedDay={selectedDay}
                />
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <div className="rounded-md border lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-0.5 text-center text-xs/6 font-semibold lg:flex-none">
            <div className="py-2">MON</div>
            <div className="py-2">TUE</div>
            <div className="py-2">WED</div>
            <div className="py-2">THU</div>
            <div className="py-2">FRI</div>
            <div className="py-2">SAT</div>
            <div className="py-2">SUN</div>
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-0.5 p-0.5 text-xs/6">
            {days.map((day) => {
              const dayEvents = events.filter((event) => isSameDay(day, event.datetime));
              const birthdays = contactsWithDobs.filter(
                (contact) =>
                  day.getMonth() === contact.dob.getMonth() &&
                  day.getDate() === contact.dob.getDate(),
              );
              return (
                <button
                  key={day.toLocaleDateString()}
                  type="button"
                  className={cn(
                    "flex h-10 flex-col items-center justify-center rounded-md hover:bg-foreground/10 focus:z-10 sm:h-20 sm:items-start sm:justify-normal sm:p-1.5 lg:h-24 dark:hover:bg-foreground/10",
                    isSameMonth(selectedMonth, day) ? "bg-muted dark:bg-muted/40" : "opacity-25",
                    !isSameDay(day, selectedDay) &&
                      isToday(day) &&
                      "text-red-500 dark:text-red-600",
                  )}
                  onClick={() => setSelectedDay(day)}
                >
                  <time
                    dateTime={format(day, "y-MM-dd")}
                    className={cn(
                      "leading-none sm:ml-auto",
                      isSameDay(day, selectedDay) &&
                        "flex size-6 items-center justify-center rounded-md",
                      isSameDay(day, selectedDay) &&
                        isToday(day) &&
                        "bg-red-500 font-semibold text-background dark:bg-red-600 dark:text-foreground",
                      isSameDay(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-foreground text-background",
                    )}
                  >
                    {format(day, "dd")}
                  </time>
                  <span className="sr-only">{dayEvents.length} events</span>
                  {(!!dayEvents.length || !!birthdays.length) && (
                    <>
                      <span className="mt-auto hidden items-center gap-1 sm:flex md:hidden">
                        {!!dayEvents.length && (
                          <span className="h-1.5 w-1.5 rounded-full bg-foreground"></span>
                        )}
                        {!!birthdays.length && (
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                        )}
                      </span>
                      <ol className="hidden w-full leading-tight md:block">
                        {!!birthdays.length &&
                          birthdays.slice(0, 1).map((contact) => (
                            <li key={contact.id}>
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Cake className="size-3 shrink-0" />
                                <p className="truncate font-medium">{contact.fullName}</p>
                              </div>
                            </li>
                          ))}
                        {birthdays.length > 1 && (
                          <li className="text-yellow-400 dark:text-yellow-600">
                            + {birthdays.length - 1} more
                          </li>
                        )}
                      </ol>
                      <ol className="mt-2 hidden w-full leading-tight md:block">
                        {!!dayEvents.length &&
                          dayEvents.slice(0, 2).map((event) => (
                            <li key={event.id}>
                              <div className="flex justify-between gap-3">
                                <p
                                  className={cn(
                                    "truncate font-medium text-muted-foreground",
                                    event.isCanceled && "line-through",
                                  )}
                                >
                                  {event.title}
                                </p>
                                {!event.isAllDay && (
                                  <time
                                    dateTime={format(event.datetime, "HH:mm")}
                                    className="hidden text-muted-foreground/50 xl:block"
                                  >
                                    {format(event.datetime, "HH:mm")}
                                  </time>
                                )}
                              </div>
                            </li>
                          ))}
                        {dayEvents.length > 2 && (
                          <li className="text-muted-foreground/50">
                            + {dayEvents.length - 2} more
                          </li>
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
        <div className="space-y-3">
          {!!selectedDayBirthdays.length && (
            <ul className="grid gap-2 sm:grid-cols-2 lg:flex lg:flex-col">
              {selectedDayBirthdays.map((contact) => (
                <li
                  key={contact.id}
                  className="space-y-4 rounded-lg border p-3 text-left text-yellow-500 transition-all"
                >
                  <div className="flex items-center text-lg font-semibold tracking-tight">
                    <Cake className="mr-2 size-4" />
                    {contact.fullName}
                    <span className="ml-1 text-base font-normal">
                      ({differenceInYears(selectedDay, contact.dob)})
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!!selectedDayEvents.length && (
            <ul className="grid gap-2 sm:grid-cols-2 lg:flex lg:flex-col">
              {selectedDayEvents.map((event) => (
                <li
                  key={event.id}
                  className="space-y-4 rounded-lg border p-3 text-left transition-all"
                >
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "text-lg font-semibold tracking-tight",
                            event.isCanceled && "line-through",
                          )}
                        >
                          {!event.isCanceled && isBefore(selectedDay, today) && (
                            <Check className="mr-1 inline-block h-4 w-4 text-green-500 dark:text-green-400" />
                          )}
                          {event.title}
                        </div>
                      </div>
                      <div className="ml-auto text-xs text-foreground">
                        {event.isAllDay ? "ALL DAY" : format(event.datetime, "HH:mm")}
                      </div>
                    </div>
                  </div>
                  {event.description && (
                    <div className="text-xs text-muted-foreground">{event.description}</div>
                  )}
                  {event.place && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs leading-none">{event.place.name}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    {event.category && <Badge>{event.category.name}</Badge>}
                    <form action={eventsToggleCancel} className="ml-auto flex items-center gap-1">
                      <input type="hidden" name="id" value={event.id} />
                      <Button type="submit" variant="outline" size="icon">
                        {event.isCanceled && <RotateCw className="h-4 w-4" />}
                        {!event.isCanceled && <Eraser className="h-4 w-4" />}
                      </Button>
                      <DeleteEvent event={event} />
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!selectedDayEvents.length && (
            <p className="text-center text-sm text-muted-foreground">There are no events.</p>
          )}
        </div>
      </section>
    </div>
  );
}
