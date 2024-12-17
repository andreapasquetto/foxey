import { placeCreateFormSchema } from "@/modules/places/schemas/place-create-form-schema";
import { z } from "zod";

export const placeUpdateFormSchema = placeCreateFormSchema.extend({
  id: z.string(),
});

export type PlaceUpdateForm = z.infer<typeof placeUpdateFormSchema>;
