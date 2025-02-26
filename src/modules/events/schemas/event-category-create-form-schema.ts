import { z } from "zod";

export const eventCategoryCreateFormSchema = z.object({
  name: z.string(),
});

export type EventCategoryCreateForm = z.infer<typeof eventCategoryCreateFormSchema>;
