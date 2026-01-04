import type { getAllEvents } from "@/modules/events/server-actions";

export type EventCategory = {
  id: string;
  name: string;
};

export type Event = Awaited<ReturnType<typeof getAllEvents>>[number];
