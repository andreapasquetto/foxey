import { eventsGetAll } from "@/modules/events/events-actions";

export type EventCategory = {
  id: string;
  name: string;
};

export type Event = Awaited<ReturnType<typeof eventsGetAll>>[number];
