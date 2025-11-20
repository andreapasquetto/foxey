import { z } from "zod";
import {
  optionalStringSchema,
  positiveRequiredNumberSchema,
  requiredStringSchema,
} from "@/common/schemas";

export const createHighwayTripFormSchema = z.object({
  datetime: z.date(),
  carId: z.uuid(),
  walletId: z.uuid().optional(),
  placeId: z.uuid().optional(),
  startingToll: requiredStringSchema,
  endingToll: requiredStringSchema,
  cost: positiveRequiredNumberSchema,
  distance: positiveRequiredNumberSchema,
  avgSpeed: positiveRequiredNumberSchema,
  description: optionalStringSchema,
});

export type CreateHighwayTripFormType = z.infer<
  typeof createHighwayTripFormSchema
>;
