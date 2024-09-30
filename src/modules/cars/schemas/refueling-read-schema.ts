export interface RefuelingRead {
  id: string;
  carId: string;
  datetime: Date;
  ron: number | null;
  place: string;
  cost: string;
  quantity: string;
  price: string;
  isFull: boolean | null;
  isNecessary: boolean | null;
  trip: string | null;
  odometer: string;
}
