import { z } from "zod";
import {
  positiveRequiredNumberSchema,
  requiredStringSchema,
} from "@/common/schemas";

export const createCarFormSchema = z.object({
  year: positiveRequiredNumberSchema,
  make: requiredStringSchema,
  model: requiredStringSchema,
});

export type CreateCarFormType = z.infer<typeof createCarFormSchema>;
