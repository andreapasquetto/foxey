import type {
  getAllHighwayTrips,
  getAllInspections,
  getAllRefuelings,
  getAllServices,
  getCarById,
} from "@/modules/mobility/server-actions";

export type Car = Awaited<ReturnType<typeof getCarById>>;

export type Refueling = Awaited<ReturnType<typeof getAllRefuelings>>[number];

export type HighwayTrip = Awaited<
  ReturnType<typeof getAllHighwayTrips>
>[number];

export type Service = Awaited<ReturnType<typeof getAllServices>>[number];

export type Inspection = Awaited<ReturnType<typeof getAllInspections>>[number];
