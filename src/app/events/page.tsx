import { Heading1 } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import { EventList } from "@/modules/events/components/event-list";

export default function EventsPage() {
  return (
    <section>
      <Heading1>Events</Heading1>

      <div className="mt-3">
        <Card className="pt-6">
          <CardContent>
            <EventList />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
