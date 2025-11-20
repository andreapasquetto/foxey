import { z } from "zod";
import {
  optionalStringSchema,
  positiveOptionalNumberSchema,
  positiveRequiredNumberSchema,
} from "@/common/schemas";

export const createRefuelingFormSchema = z.object({
  datetime: z.date(),
  carId: z.uuid(),
  walletId: z.uuid().optional(),
  placeId: z.uuid().optional(),
  price: positiveRequiredNumberSchema,
  quantity: positiveRequiredNumberSchema,
  cost: positiveRequiredNumberSchema,
  isFull: z.boolean(),
  isNecessary: z.boolean(),
  trip: positiveOptionalNumberSchema,
  odometer: positiveRequiredNumberSchema,
  description: optionalStringSchema,
});

export type CreateRefuelingFormType = z.infer<typeof createRefuelingFormSchema>;
