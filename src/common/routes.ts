export const signInRoute = "/sign-in";

export const privateRoute = "/private";

export const contactsRoute = `${privateRoute}/contacts`;
export const newContactRoute = `${contactsRoute}/new`;

export const eventsRoute = `${privateRoute}/events`;

export const financeRoute = `${privateRoute}/finance`;
export const walletsRoute = `${financeRoute}/wallets`;
export const transactionsRoute = `${financeRoute}/transactions`;
export const tagsRoute = `${financeRoute}/tags`;
export const transactionRoute = (id: string) => `${transactionsRoute}/${id}`;
export const transactionCategoriesRoute = `${transactionsRoute}/categories`;
export const transactionTemplatesRoute = `${transactionsRoute}/templates`;
export const newTransactionCategoryRoute = `${transactionCategoriesRoute}/new`;
export const newTransactionTemplateRoute = `${transactionTemplatesRoute}/new`;
export const newTransactionRoute = `${transactionsRoute}/new`;
export const newTagRoute = `${tagsRoute}/new`;
export const walletRoute = (id: string) => `${walletsRoute}/${id}`;
export const newWalletRoute = `${walletsRoute}/new`;

export const mobilityRoute = `${privateRoute}/mobility`;
export const carsRoute = `${mobilityRoute}/cars`;
export const carRoute = (id: string) => `${carsRoute}/${id}`;
export const newHighwayTripRoute = (carId: string) =>
  `${carRoute(carId)}/highway-trips/new`;
export const newInspectionRoute = (carId: string) =>
  `${carRoute(carId)}/inspections/new`;
export const newRefuelingRoute = (carId: string) =>
  `${carRoute(carId)}/refuelings/new`;
export const newServiceRoute = (carId: string) =>
  `${carRoute(carId)}/services/new`;
export const newCarRoute = `${carsRoute}/new`;

export const placesRoute = `${privateRoute}/places`;
export const placeRoute = (id: string) => `${placesRoute}/${id}`;
export const placeCategoriesRoute = `${placesRoute}/categories`;
export const newPlaceRoute = `${placesRoute}/new`;
