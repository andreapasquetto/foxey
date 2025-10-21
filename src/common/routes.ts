export const privateRoute = "/private";

export const financeRoute = `${privateRoute}/finance`;
export const newTransactionCategoryRoute = `${financeRoute}/categories/new`;
export const transactionsRoute = `${financeRoute}/transactions`;
export const newTransactionRoute = `${transactionsRoute}/new`;
export const newWalletRoute = `${financeRoute}/wallets/new`;

export function transactionRoute(id: string) {
  return `${financeRoute}/transactions/${id}`;
}
export function walletRoute(id: string) {
  return `${financeRoute}/wallets/${id}`;
}

export const contactsRoute = `${privateRoute}/contacts`;
export const newContactRoute = `${contactsRoute}/new`;

export const eventsRoute = `${privateRoute}/events`;

export const mobilityRoute = `${privateRoute}/mobility`;
export const newCarRoute = `${mobilityRoute}/cars/new`;

export function newRefuelingRoute(carId: string) {
  return `${mobilityRoute}/cars/${carId}/refuelings/new`;
}
export function newHighwayTripRoute(carId: string) {
  return `${mobilityRoute}/cars/${carId}/highway-trips/new`;
}
export function newServiceRoute(carId: string) {
  return `${mobilityRoute}/cars/${carId}/services/new`;
}
export function newInspectionRoute(carId: string) {
  return `${mobilityRoute}/cars/${carId}/inspections/new`;
}

export function carRoute(id: string) {
  return `${mobilityRoute}/cars/${id}`;
}

export const placesRoute = `${privateRoute}/places`;
export const placeCategoriesRoute = `${placesRoute}/categories`;
export const newPlaceRoute = `${placesRoute}/new`;

export function placeRoute(id: string) {
  return `${placesRoute}/${id}`;
}
