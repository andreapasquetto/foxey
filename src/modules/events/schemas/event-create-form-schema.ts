import { z } from "zod";

export const eventCreateFormSchema = z.object({
  categoryId: z.string().optional(),
  placeId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  isAllDay: z.boolean(),
  datetime: z.date(),
});

export type EventCreateForm = z.infer<typeof eventCreateFormSchema>;
