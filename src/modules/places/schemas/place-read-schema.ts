import { IdAndName } from "@/common/types";

export interface PlaceRead {
  id: string;
  category: IdAndName | null;
  name: string;
  address: string | null;
  coordinates: [number, number] | null;
  isVisited: boolean;
}
