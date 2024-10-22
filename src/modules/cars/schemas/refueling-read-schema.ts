import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";

export interface RefuelingRead {
  id: string;
  datetime: Date;
  car: CarRead;
  place: PlaceRead | null;
  ron: number | null;
  cost: string;
  quantity: string;
  price: string;
  isFull: boolean | null;
  isNecessary: boolean | null;
  trip: string | null;
  odometer: string;
}
