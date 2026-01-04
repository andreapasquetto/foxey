import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { getAllContactsBirthdays } from "@/modules/contacts/server-actions";
import { MonthCalendar } from "@/modules/events/components/month-calendar";
import {
  getAllEventCategories,
  getAllEvents,
} from "@/modules/events/server-actions";
import { getAllPlaces } from "@/modules/places/server-actions";

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const categories = await getAllEventCategories();
  const places = await getAllPlaces();
  const contacts = await getAllContactsBirthdays();
  const events = await getAllEvents();

  return (
    <div className="space-y-12 pb-6">
      <Heading1>Events</Heading1>
      <section className="space-y-6">
        <MonthCalendar
          categories={categories}
          places={places}
          contacts={contacts}
          events={events}
        />
      </section>
    </div>
  );
}
