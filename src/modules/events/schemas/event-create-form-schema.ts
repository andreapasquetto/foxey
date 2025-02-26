import { z } from "zod";

export const eventCreateFormSchema = z.object({
  categoryId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  isAllDay: z.boolean().default(false),
  datetime: z.coerce.date(),
});

export type EventCreateForm = z.infer<typeof eventCreateFormSchema>;
