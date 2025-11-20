import { z } from "zod";
import {
  optionalStringSchema,
  positiveRequiredNumberSchema,
} from "@/common/schemas";

export const createServiceFormSchema = z.object({
  datetime: z.date(),
  carId: z.uuid(),
  odometer: positiveRequiredNumberSchema,
  notes: optionalStringSchema,
});

export type CreateServiceFormType = z.infer<typeof createServiceFormSchema>;
