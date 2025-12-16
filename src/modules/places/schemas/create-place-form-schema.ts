import { z } from "zod";
import { nullableStringSchema, requiredStringSchema } from "@/common/schemas";

export const createPlaceFormSchema = z.object({
  categoryId: z.uuid().nullable(),
  name: requiredStringSchema,
  address: nullableStringSchema,
  isVisited: z.boolean(),
});

export type CreatePlaceFormType = z.infer<typeof createPlaceFormSchema>;
