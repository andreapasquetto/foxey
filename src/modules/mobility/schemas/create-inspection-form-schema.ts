import { z } from "zod";
import { positiveRequiredNumberSchema } from "@/common/schemas";

export const createInspectionFormSchema = z.object({
  datetime: z.date(),
  carId: z.uuid(),
  odometer: positiveRequiredNumberSchema,
  isSuccessful: z.boolean(),
});

export type CreateInspectionFormType = z.infer<
  typeof createInspectionFormSchema
>;
