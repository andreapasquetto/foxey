import { DateRange } from "react-day-picker";

export function carsQueryKey() {
  return ["cars"];
}

export function refuelingsQueryKey(carId?: string) {
  if (carId) return ["refuelings", carId];
  return ["refuelings"];
}

export function servicesQueryKey(carId?: string) {
  if (carId) return ["services", carId];
  return ["services"];
}

export function highwayTripsQueryKey(carId?: string) {
  if (carId) return ["highway-trips", carId];
  return ["highway-trips"];
}

export function contactsQueryKey() {
  return ["contacts"];
}

export function contactDeleteQueryKey(id: string) {
  return ["contacts", id, "delete"];
}

export function walletsQueryKey() {
  return ["wallets"];
}

export function transactionCategoriesQueryKey() {
  return ["transaction-categories"];
}

export function transactionsQueryKey(
  params: {
    walletId?: string;
    dateRange?: DateRange;
    searchFilter?: string;
  } = {},
) {
  return ["transactions", { ...params }];
}

export function transactionQueryKey(id: string) {
  return ["transactions", id];
}

export function transactionDeleteQueryKey(id: string) {
  return ["transactions", id, "delete"];
}

export function placeCategoriesQueryKey() {
  return ["place-categories"];
}

export function placesQueryKey() {
  return ["places"];
}

export function placeDeleteQueryKey(id: string) {
  return ["places", id, "delete"];
}
