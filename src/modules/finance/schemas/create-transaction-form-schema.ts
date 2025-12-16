import { z } from "zod";
import {
  nullableStringSchema,
  positiveRequiredNumberSchema,
} from "@/common/schemas";

export const createTransactionFormSchema = z
  .object({
    datetime: z.date({ error: "Required" }),
    categoryId: z.uuid().nullable(),
    placeId: z.uuid().nullable(),
    fromWalletId: z.uuid().nullable(),
    toWalletId: z.uuid().nullable(),
    amount: positiveRequiredNumberSchema,
    description: nullableStringSchema,
  })
  .superRefine((val, ctx) => {
    if (!val.fromWalletId && !val.toWalletId) {
      ctx.addIssue({
        code: "custom",
        message: "At least From or To is required",
        path: ["toWalletId"],
      });
      return;
    }
    if (val.fromWalletId === val.toWalletId) {
      ctx.addIssue({
        code: "custom",
        message: "No duplicates allowed",
        path: ["toWalletId"],
      });
    }
  });

export type CreateTransactionFormType = z.infer<
  typeof createTransactionFormSchema
>;
