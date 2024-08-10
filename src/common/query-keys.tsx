import { formatISO } from "date-fns";
import { DateRange } from "react-day-picker";

export function carsQueryKey() {
  return ["cars"];
}

export function refuelingsQueryKey(carId?: string) {
  if (carId) return ["refuelings", carId];
  return ["refuelings"];
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

export function transactionsMonthToDateQueryKey() {
  return ["transactions", "month-to-date"];
}

export function transactionsLastMonthQueryKey() {
  return ["transactions", "last-month"];
}

export function transactionsQueryKey(params: { walletId?: string; dateRange?: DateRange } = {}) {
  if (params.walletId && params.dateRange) {
    return [
      "transactions",
      params.walletId,
      `from-${formatISO(params.dateRange.from!, { representation: "date" })}`,
      `to-${formatISO(params.dateRange.to!, { representation: "date" })}`,
    ];
  }
  if (params.walletId) {
    return ["transactions", params.walletId];
  }
  if (params.dateRange) {
    return [
      "transactions",
      `from-${formatISO(params.dateRange.from!, { representation: "date" })}`,
      `to-${formatISO(params.dateRange.to!, { representation: "date" })}`,
    ];
  }
  return ["transactions"];
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
