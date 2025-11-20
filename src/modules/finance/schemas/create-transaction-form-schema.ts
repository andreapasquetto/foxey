import { z } from "zod";
import {
  optionalStringSchema,
  positiveRequiredNumberSchema,
} from "@/common/schemas";

export const createTransactionFormSchema = z.object({
  datetime: z.date({ error: "Required" }),
  categoryId: z.uuid().optional(),
  placeId: z.uuid().optional(),
  fromWalletId: z.uuid().optional(),
  toWalletId: z.uuid().optional(),
  amount: positiveRequiredNumberSchema,
  description: optionalStringSchema,
});

export type CreateTransactionFormType = z.infer<
  typeof createTransactionFormSchema
>;
