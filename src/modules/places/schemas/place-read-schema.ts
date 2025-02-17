import { IdName } from "@/common/types";

interface PlaceCategoryRead extends IdName {
  userId: string;
}

export interface PlaceRead {
  id: string;
  userId: string;
  categoryId: string | null;
  category: PlaceCategoryRead | null;
  coordinates: [number, number] | null;
  isVisited: boolean;
  name: string;
  address: string | null;
}
