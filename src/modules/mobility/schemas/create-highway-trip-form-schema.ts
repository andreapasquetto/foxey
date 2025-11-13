import { z } from "zod";

export const createHighwayTripFormSchema = z.object({
  datetime: z.date(),
  carId: z.string().min(1).max(255),
  walletId: z.string().optional(),
  placeId: z.string().min(1).max(255).optional(),
  startingToll: z.string().min(1).max(255),
  endingToll: z.string().min(1).max(255),
  distance: z.number(),
  cost: z.number().min(0),
  avgSpeed: z.number(),
  description: z.string().optional(),
});

export type CreateHighwayTripFormType = z.infer<typeof createHighwayTripFormSchema>;
