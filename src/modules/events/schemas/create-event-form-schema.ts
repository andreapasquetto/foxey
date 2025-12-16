import { z } from "zod";
import { nullableStringSchema, requiredStringSchema } from "@/common/schemas";

export const createEventFormSchema = z.object({
  datetime: z.date({ error: "Required" }),
  isAllDay: z.boolean(),
  title: requiredStringSchema,
  description: nullableStringSchema,
  categoryId: z.uuid().nullable(),
  placeId: z.uuid().nullable(),
});

export type CreateEventFormType = z.infer<typeof createEventFormSchema>;
