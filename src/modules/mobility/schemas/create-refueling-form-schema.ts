import { z } from "zod";
import {
  nullableStringSchema,
  positiveNullableNumberSchema,
  positiveRequiredNumberSchema,
} from "@/common/schemas";

export const createRefuelingFormSchema = z.object({
  datetime: z.date({ error: "Required" }),
  carId: z.uuid(),
  categoryId: z.uuid().nullable(),
  placeId: z.uuid().nullable(),
  walletId: z.uuid().nullable(),
  tagId: z.uuid().nullable(),
  description: nullableStringSchema,
  price: positiveRequiredNumberSchema,
  quantity: positiveRequiredNumberSchema,
  cost: positiveRequiredNumberSchema,
  isFull: z.boolean(),
  isNecessary: z.boolean(),
  trip: positiveNullableNumberSchema,
  odometer: positiveRequiredNumberSchema,
});

export type CreateRefuelingFormType = z.infer<typeof createRefuelingFormSchema>;
