import { z } from "zod";
import {
  nullableStringSchema,
  positiveRequiredNumberSchema,
  requiredStringSchema,
} from "@/common/schemas";

export const createHighwayTripFormSchema = z.object({
  datetime: z.date({ error: "Required" }),
  carId: z.uuid(),
  categoryId: z.uuid().nullable(),
  walletId: z.uuid().nullable(),
  tagId: z.uuid().nullable(),
  description: nullableStringSchema,
  startingToll: requiredStringSchema,
  endingToll: requiredStringSchema,
  cost: positiveRequiredNumberSchema,
  distance: positiveRequiredNumberSchema,
  avgSpeed: positiveRequiredNumberSchema,
});

export type CreateHighwayTripFormType = z.infer<
  typeof createHighwayTripFormSchema
>;
