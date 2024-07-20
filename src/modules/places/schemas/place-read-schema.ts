export interface PlaceRead {
  id: string;
  categoryId: string | null;
  name: string;
  address: string;
  isVisited: boolean;
}
