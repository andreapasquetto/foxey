import { IdAndName } from "@/common/schemas/id-and-name-schema";

export interface PlaceRead {
  id: string;
  category: IdAndName | null;
  name: string;
  address: string | null;
  coordinates: [number, number] | null;
  isVisited: boolean;
}
