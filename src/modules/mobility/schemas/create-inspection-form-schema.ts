import { z } from "zod";

export const createInspectionFormSchema = z.object({
  datetime: z.date(),
  carId: z.string().min(1).max(255),
  odometer: z.number(),
  isSuccessful: z.boolean(),
});

export type CreateInspectionFormType = z.infer<typeof createInspectionFormSchema>;
