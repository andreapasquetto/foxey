import { z } from "zod";

export const placeCreateFormSchema = z.object({
  categoryId: z.string().optional(),
  name: z.string(),
  address: z.string().optional(),
  isVisited: z.boolean(),
});

export type PlaceCreateForm = z.infer<typeof placeCreateFormSchema>;
