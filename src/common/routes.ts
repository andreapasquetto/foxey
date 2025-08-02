export const privateRoute = "/private";

export const financeRoute = `${privateRoute}/finance`;
export const transactionCategoriesRoute = `${financeRoute}/categories`;
export const newTransactionCategoryRoute = `${financeRoute}/categories/new`;
export const newTransactionRoute = `${financeRoute}/transactions/new`;
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

// TODO: make these routes car-specific (/mobility/cars/:carId/...)
export const newHighwayTripRoute = `${mobilityRoute}/highway-trips/new`;
export const newRefuelingRoute = `${mobilityRoute}/refuelings/new`;
export const newInspectionRoute = `${mobilityRoute}/inspections/new`;

export function carRoute(id: string) {
  return `${mobilityRoute}/cars/${id}`;
}

export const placesRoute = `${privateRoute}/places`;
export const placeCategoriesRoute = `${placesRoute}/categories`;
export const newPlaceRoute = `${placesRoute}/new`;

export function placeRoute(id: string) {
  return `${placesRoute}/${id}`;
}
