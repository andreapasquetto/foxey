import { createPlaceFormSchema } from "@/modules/places/schemas/create-place-form-schema";
import { z } from "zod";

export const updatePlaceFormSchema = createPlaceFormSchema.extend({
  id: z.string(),
});

export type UpdatePlaceFormType = z.infer<typeof updatePlaceFormSchema>;
