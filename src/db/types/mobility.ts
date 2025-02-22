import {
  carsGetById,
  highwayTripsGetPaginated,
  inspectionsGetAll,
  refuelingsGetAll,
  servicesGetAll,
} from "@/modules/mobility/mobility-actions";

export type Car = Awaited<ReturnType<typeof carsGetById>>;

export type Refueling = Awaited<ReturnType<typeof refuelingsGetAll>>[number];

export type HighwayTrip = Awaited<ReturnType<typeof highwayTripsGetPaginated>>["records"][number];

export type Service = Awaited<ReturnType<typeof servicesGetAll>>[number];

export type Inspection = Awaited<ReturnType<typeof inspectionsGetAll>>[number];
