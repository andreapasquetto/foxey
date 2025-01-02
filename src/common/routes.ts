// TODO: change this to "/private" when moving app routes for authentication
export const privateRoute = "";

export const accountingRoute = `${privateRoute}/accounting`;
export const transactionCategoriesRoute = `${accountingRoute}/categories`;
export const newTransactionCategoryRoute = `${accountingRoute}/categories/new`;
export const newTransactionRoute = `${accountingRoute}/transactions/new"`;
export const newWalletRoute = `${accountingRoute}/wallets/new`;

export function transactionRoute(id: string) {
  return `${accountingRoute}/transactions/${id}`;
}
export function walletRoute(id: string) {
  return `${accountingRoute}/walets/${id}`;
}

export const contactsRoute = `${privateRoute}/contacts`;

export const eventsRoute = `${privateRoute}/events`;

export const mobilityRoute = `${privateRoute}/mobility`;
export const newCarRoute = `${mobilityRoute}/cars/new`;
export const newHighwayTripRoute = `${mobilityRoute}/highway-trips/new`;
export const newRefuelingRoute = `${mobilityRoute}/refuelings/new`;

export const placesRoute = `${privateRoute}/places`;
export const placeCategoriesRoute = `${placesRoute}/categories`;
export const newPlaceRoute = `${placesRoute}/new`;

export function placeRoute(id: string) {
  return `${placesRoute}/${id}`;
}
