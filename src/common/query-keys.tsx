export function carsQueryKey() {
  return ["cars"];
}
export function refuelingsQueryKey() {
  return ["refuelings"];
}

export function highwayTripsQueryKey() {
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

export function transactionsQueryKey() {
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
