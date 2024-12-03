import { coercedOptionalString } from "@/common/schemas";
import { z } from "zod";

export const transactionCreateFormSchema = z.object({
  datetime: z.coerce.date(),
  fromWalletId: z.string().optional(),
  toWalletId: z.string().optional(),
  categoryId: z.string().optional(),
  placeId: z.string().optional(),
  amount: z.number().min(0.01),
  description: coercedOptionalString,
});

export type TransactionCreateForm = z.infer<typeof transactionCreateFormSchema>;
