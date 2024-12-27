import { IdAndNameWithParent } from "@/common/types";

export interface PlaceCategoryRead extends IdAndNameWithParent {
  usages: number;
}
