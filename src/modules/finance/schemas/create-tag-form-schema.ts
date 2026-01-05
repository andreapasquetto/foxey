import { z } from "zod";
import { requiredStringSchema } from "@/common/schemas";

export const createTagFormSchema = z.object({
  name: requiredStringSchema,
});

export type CreateTagFormType = z.infer<typeof createTagFormSchema>;
