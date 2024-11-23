import { z } from "zod";

export const carCreateFormSchema = z.object({
  year: z.number(),
  make: z.string().min(1).max(255),
  model: z.string().min(1).max(255),
});

export type CarCreateForm = z.infer<typeof carCreateFormSchema>;
