import { Heading1 } from "@/components/typography";
import { MonthCalendar } from "@/modules/events/components/month-calendar";

export default function EventsPage() {
  return (
    <div className="space-y-12 pb-6">
      <Heading1>Events</Heading1>
      <section className="space-y-6">
        <MonthCalendar />
      </section>
    </div>
  );
}
