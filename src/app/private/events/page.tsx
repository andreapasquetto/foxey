import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { contactsGetAllBirthdays } from "@/modules/contacts/contacts-actions";
import { MonthCalendar } from "@/modules/events/components/month-calendar";
import {
  eventCategoriesGetAll,
  eventsGetAll,
} from "@/modules/events/events-actions";
import { placesGetAll } from "@/modules/places/places-actions";

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const categories = await eventCategoriesGetAll();
  const places = await placesGetAll();
  const contacts = await contactsGetAllBirthdays();
  const events = await eventsGetAll();

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
