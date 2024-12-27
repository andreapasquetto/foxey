import { IdAndNameWithParent } from "@/common/types";

export interface PlaceRead {
  id: string;
  category: IdAndNameWithParent | null;
  name: string;
  address: string | null;
  coordinates: [number, number] | null;
  isVisited: boolean;
}
