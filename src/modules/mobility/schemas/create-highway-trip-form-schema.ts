import { z } from "zod";
import {
  nullableStringSchema,
  positiveRequiredNumberSchema,
  requiredStringSchema,
} from "@/common/schemas";

export const createHighwayTripFormSchema = z.object({
  datetime: z.date(),
  carId: z.uuid(),
  walletId: z.uuid().nullable(),
  placeId: z.uuid().nullable(),
  startingToll: requiredStringSchema,
  endingToll: requiredStringSchema,
  cost: positiveRequiredNumberSchema,
  distance: positiveRequiredNumberSchema,
  avgSpeed: positiveRequiredNumberSchema,
  description: nullableStringSchema,
});

export type CreateHighwayTripFormType = z.infer<
  typeof createHighwayTripFormSchema
>;
