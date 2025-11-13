import { z } from "zod";

export const createCarFormSchema = z.object({
  year: z.number(),
  make: z.string().min(1).max(255),
  model: z.string().min(1).max(255),
});

export type CreateCarFormType = z.infer<typeof createCarFormSchema>;
