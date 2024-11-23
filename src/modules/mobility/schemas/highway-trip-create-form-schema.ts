import { z } from "zod";

export const highwayTripCreateFormSchema = z.object({
  carId: z.string().min(1).max(255),
  datetime: z.coerce.date(),
  startingToll: z.string().min(1).max(255),
  endingToll: z.string().min(1).max(255),
  distance: z.number(),
  cost: z.number().min(0),
  avgSpeed: z.number(),
});

export type HighwayTripCreateForm = z.infer<typeof highwayTripCreateFormSchema>;
