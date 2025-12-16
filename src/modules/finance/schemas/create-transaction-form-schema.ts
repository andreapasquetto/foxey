import { z } from "zod";
import {
  nullableStringSchema,
  positiveRequiredNumberSchema,
} from "@/common/schemas";

export const createTransactionFormSchema = z.object({
  datetime: z.date({ error: "Required" }),
  categoryId: z.uuid().nullable(),
  placeId: z.uuid().nullable(),
  fromWalletId: z.uuid().nullable(),
  toWalletId: z.uuid().nullable(),
  amount: positiveRequiredNumberSchema,
  description: nullableStringSchema,
});

export type CreateTransactionFormType = z.infer<
  typeof createTransactionFormSchema
>;
