import { z } from "zod";

export const createServiceFormSchema = z.object({
  datetime: z.date(),
  carId: z.string().min(1).max(255),
  odometer: z.number(),
  notes: z.string().max(255).optional(),
});

export type CreateServiceFormType = z.infer<typeof createServiceFormSchema>;
