import { z } from "zod";

export const highwayTripCreateFormSchema = z.object({
  car: z.string().min(1).max(255),
  start: z.string().min(1).max(255),
  end: z.string().min(1).max(255),
  distance: z.number(),
  cost: z.number().min(0),
  avgSpeed: z.number(),
});

export type HighwayTripCreateForm = z.infer<typeof highwayTripCreateFormSchema>;
