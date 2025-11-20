import { z } from "zod";
import { optionalStringSchema, requiredStringSchema } from "@/common/schemas";

export const createPlaceFormSchema = z.object({
  categoryId: z.uuid().optional(),
  name: requiredStringSchema,
  address: optionalStringSchema,
  isVisited: z.boolean(),
});

export type CreatePlaceFormType = z.infer<typeof createPlaceFormSchema>;
