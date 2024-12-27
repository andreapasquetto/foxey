import { IdNameParent } from "@/common/types";

export interface PlaceRead {
  id: string;
  category: IdNameParent | null;
  name: string;
  address: string | null;
  coordinates: [number, number] | null;
  isVisited: boolean;
}
