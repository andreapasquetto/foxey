import { coercedOptionalString } from "@/common/schemas";
import { z } from "zod";

export const placeCreateFormSchema = z.object({
  categoryId: z.string(),
  name: z.string(),
  address: coercedOptionalString,
  isVisited: z.boolean().default(false),
});

export type PlaceCreateForm = z.infer<typeof placeCreateFormSchema>;
