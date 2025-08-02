import { Heading1 } from "@/components/typography";
import { contactsGetAll } from "@/modules/contacts/contacts-actions";
import { MonthCalendar } from "@/modules/events/components/month-calendar";

export default async function EventsPage() {
  const contacts = await contactsGetAll();
  return (
    <div className="space-y-12 pb-6">
      <Heading1>Events</Heading1>
      <section className="space-y-6">
        <MonthCalendar contacts={contacts} />
      </section>
    </div>
  );
}
