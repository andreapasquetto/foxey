import { DateRange } from "react-day-picker";

export function carsQueryKey() {
  return ["cars"];
}

export function refuelingsQueryKey(carId?: string) {
  return ["refuelings", carId];
}

export function servicesQueryKey(carId?: string) {
  return ["services", carId];
}

export function highwayTripsQueryKey(carId?: string) {
  return ["highway-trips", carId];
}

export function contactsQueryKey(id?: string) {
  return ["contacts", id];
}

export function walletsQueryKey(id?: string) {
  return ["wallets", id];
}

export function transactionCategoriesQueryKey() {
  return ["transaction-categories"];
}

export function transactionsQueryKey(
  params: {
    searchFilter?: string;
    dateRange?: DateRange;
    walletId?: string;
    placeId?: string;
    categoryId?: string;
  } = {},
) {
  return ["transactions", { ...params }];
}

export function transactionQueryKey(id: string) {
  return ["transactions", id];
}

export function placeCategoriesQueryKey() {
  return ["place-categories"];
}

export function placesQueryKey(id?: string) {
  return ["places", id];
}
