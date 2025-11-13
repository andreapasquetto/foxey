import { z } from "zod";

export const createPlaceFormSchema = z.object({
  categoryId: z.string().optional(),
  name: z.string(),
  address: z.string().optional(),
  isVisited: z.boolean(),
});

export type CreatePlaceFormType = z.infer<typeof createPlaceFormSchema>;
