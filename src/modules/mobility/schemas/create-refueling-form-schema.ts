import { z } from "zod";
import {
  nullableStringSchema,
  positiveNullableNumberSchema,
  positiveRequiredNumberSchema,
} from "@/common/schemas";

export const createRefuelingFormSchema = z.object({
  datetime: z.date(),
  carId: z.uuid(),
  walletId: z.uuid().nullable(),
  placeId: z.uuid().nullable(),
  categoryId: z.uuid().nullable(),
  price: positiveRequiredNumberSchema,
  quantity: positiveRequiredNumberSchema,
  cost: positiveRequiredNumberSchema,
  isFull: z.boolean(),
  isNecessary: z.boolean(),
  trip: positiveNullableNumberSchema,
  odometer: positiveRequiredNumberSchema,
  description: nullableStringSchema,
});

export type CreateRefuelingFormType = z.infer<typeof createRefuelingFormSchema>;
