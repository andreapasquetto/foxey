export const signInRoute = "/sign-in";

export const privateRoute = "/private";

export const contactsRoute = `${privateRoute}/contacts`;
export const newContactRoute = `${contactsRoute}/new`;

export const eventsRoute = `${privateRoute}/events`;

export const financeRoute = `${privateRoute}/finance`;
export const transactionsRoute = `${financeRoute}/transactions`;
export function transactionRoute(id: string) {
  return `${transactionsRoute}/${id}`;
}
export const transactionCategoriesRoute = `${transactionsRoute}/categories`;
export const newTransactionCategoryRoute = `${transactionCategoriesRoute}/new`;
export const newTransactionRoute = `${transactionsRoute}/new`;
export function walletRoute(id: string) {
  return `${financeRoute}/wallets/${id}`;
}
export const newWalletRoute = `${financeRoute}/wallets/new`;

export const mobilityRoute = `${privateRoute}/mobility`;
export const carsRoute = `${mobilityRoute}/cars`;
export function carRoute(id: string) {
  return `${carsRoute}/${id}`;
}
export function newHighwayTripRoute(carId: string) {
  return `${carRoute(carId)}/highway-trips/new`;
}
export function newInspectionRoute(carId: string) {
  return `${carRoute(carId)}/inspections/new`;
}
export function newRefuelingRoute(carId: string) {
  return `${carRoute(carId)}/refuelings/new`;
}
export function newServiceRoute(carId: string) {
  return `${carRoute(carId)}/services/new`;
}
export const newCarRoute = `${carsRoute}/new`;

export const placesRoute = `${privateRoute}/places`;
export const placeRoute = (id: string) => `${placesRoute}/${id}`;
export const placeCategoriesRoute = `${placesRoute}/categories`;
export const newPlaceRoute = `${placesRoute}/new`;
