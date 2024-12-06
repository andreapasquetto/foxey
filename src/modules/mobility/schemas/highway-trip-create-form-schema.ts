import { coercedOptionalString } from "@/common/schemas";
import { z } from "zod";

export const highwayTripCreateFormSchema = z.object({
  datetime: z.coerce.date(),
  carId: z.string().min(1).max(255),
  walletId: z.string().optional(),
  placeId: z.string().min(1).max(255).optional(),
  startingToll: z.string().min(1).max(255),
  endingToll: z.string().min(1).max(255),
  distance: z.number(),
  cost: z.number().min(0),
  avgSpeed: z.number(),
  description: coercedOptionalString,
});

export type HighwayTripCreateForm = z.infer<typeof highwayTripCreateFormSchema>;
