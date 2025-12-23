"use client";

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
  MapPin,
  Plus,
  SquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { placeRoute } from "@/common/routes";
import { IGNORE_DOB_YEAR } from "@/common/utils/dates";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Contact } from "@/db/types/contacts";
import type { Event } from "@/db/types/events";
import type { Place, PlaceCategory } from "@/db/types/places";
import { cn } from "@/lib/utils";
import { CancelOrRestoreEvent } from "@/modules/events/components/dialogs/cancel-or-restore-event";
import { DeleteEvent } from "@/modules/events/components/dialogs/delete-event";
import { EventCreateForm } from "@/modules/events/components/forms/event-create-form";

export function MonthCalendar(props: {
  categories: PlaceCategory[];
  places: Place[];
  contacts: Pick<Contact, "id" | "fullName" | "dob">[];
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

  const selectedDayEvents = events.filter((event) =>
    isSameDay(selectedDay, event.datetime),
  );
  const contactsWithDobs = contacts
    .filter((contact) => contact.dob)
    .map((contact) => ({
      ...contact,
      dob: parse(contact.dob!, "yyyy-MM-dd", new Date()),
    }));
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
            <ButtonGroup>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-r-none"
                    onClick={() => goToPreviousYear()}
                  >
                    <ChevronsLeft />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Previous Year</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none"
                    onClick={() => goToPreviousMonth()}
                  >
                    <ChevronLeft />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Previous Month</TooltipContent>
              </Tooltip>
              <Button
                variant="outline"
                className="hidden rounded-none md:inline-flex"
                onClick={() => goToCurrentMonthOrSelectToday()}
              >
                Today
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none"
                    onClick={() => goToNextMonth()}
                  >
                    <ChevronRight />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next Month</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => goToNextYear()}
                  >
                    <ChevronsRight />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next Year</TooltipContent>
              </Tooltip>
            </ButtonGroup>
            <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild>
                    <Button size="icon">
                      <Plus />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>New</TooltipContent>
              </Tooltip>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create Event</SheetTitle>
                </SheetHeader>
                <div className="px-4">
                  <EventCreateForm
                    categories={categories}
                    places={places}
                    selectedDay={selectedDay}
                    onSuccess={() => {
                      setShowCreateSheet(false);
                    }}
                  />
                </div>
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
              const dayEvents = events.filter((event) =>
                isSameDay(day, event.datetime),
              );
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
                    isSameMonth(selectedMonth, day)
                      ? "bg-muted dark:bg-muted/40"
                      : "opacity-25",
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
                          <span className="size-1.5 rounded-full bg-foreground"></span>
                        )}
                        {!!birthdays.length && (
                          <span className="size-1.5 rounded-full bg-yellow-500"></span>
                        )}
                      </span>
                      <ol className="hidden w-full leading-tight md:block">
                        {!!birthdays.length &&
                          birthdays.slice(0, 1).map((contact) => (
                            <li key={contact.id}>
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Cake className="size-3 shrink-0" />
                                <p className="truncate font-medium">
                                  {contact.fullName}
                                </p>
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
        <div className="space-y-2">
          {!!selectedDayBirthdays.length && (
            <ItemGroup className="gap-2">
              {selectedDayBirthdays.map((contact) => (
                <Item
                  key={contact.id}
                  variant="outline"
                  className="text-yellow-500 border-yellow-500/25"
                >
                  <ItemContent>
                    <ItemTitle>
                      <div className="flex items-center gap-2">
                        <Cake />
                        <div>
                          {contact.fullName}
                          {contact.dob.getFullYear() !== IGNORE_DOB_YEAR && (
                            <span className="ml-1">
                              ({differenceInYears(selectedDay, contact.dob)})
                            </span>
                          )}
                        </div>
                      </div>
                    </ItemTitle>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          )}
          {selectedDayEvents.length ? (
            <ItemGroup className="gap-2">
              {selectedDayEvents.map((event) => (
                <Item key={event.id} variant="outline">
                  <ItemContent>
                    <div className="flex items-center justify-between">
                      <ItemTitle
                        className={cn(event.isCanceled && "line-through")}
                      >
                        <div className="flex items-center gap-1">
                          {!event.isCanceled &&
                            isBefore(selectedDay, today) && (
                              <Check className="text-green-500 dark:text-green-400" />
                            )}
                          {event.title}
                        </div>
                      </ItemTitle>
                      <ItemDescription>
                        {event.isAllDay
                          ? "ALL DAY"
                          : format(event.datetime, "HH:mm")}
                      </ItemDescription>
                    </div>
                    {event.description && (
                      <ItemDescription>{event.description}</ItemDescription>
                    )}
                    {event.place && (
                      <div className="flex items-center gap-1">
                        <MapPin className="size-4 text-muted-foreground" />
                        <ItemDescription>
                          <Link
                            href={placeRoute(event.place.id)}
                            target="_blank"
                            className="flex items-start gap-px hover:text-foreground hover:underline"
                          >
                            {event.place.name}

                            <SquareArrowOutUpRight className="size-3" />
                          </Link>
                        </ItemDescription>
                      </div>
                    )}
                    {event.category && <Badge>{event.category.name}</Badge>}
                  </ItemContent>
                  <ItemFooter className="gap-1">
                    <CancelOrRestoreEvent event={event} />
                    <DeleteEvent event={event} />
                  </ItemFooter>
                </Item>
              ))}
            </ItemGroup>
          ) : (
            <EmptyStateMessage message="There are no events for this day." />
          )}
        </div>
      </section>
    </div>
  );
}
