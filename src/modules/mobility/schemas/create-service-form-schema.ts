import { z } from "zod";
import {
  nullableStringSchema,
  positiveRequiredNumberSchema,
} from "@/common/schemas";

export const createServiceFormSchema = z.object({
  datetime: z.date(),
  carId: z.uuid(),
  odometer: positiveRequiredNumberSchema,
  notes: nullableStringSchema,
});

export type CreateServiceFormType = z.infer<typeof createServiceFormSchema>;
