import { z } from "zod";
import { optionalStringSchema, requiredStringSchema } from "@/common/schemas";

export const createEventFormSchema = z.object({
  datetime: z.date({ error: "Required" }),
  isAllDay: z.boolean(),
  title: requiredStringSchema,
  description: optionalStringSchema,
  categoryId: z.uuid().optional(),
  placeId: z.uuid().optional(),
});

export type CreateEventFormType = z.infer<typeof createEventFormSchema>;
