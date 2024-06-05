export const mockedCars = [
  {
    id: "1bb94e0a-534c-43cd-920d-a118b849c156",
    year: 2024,
    make: "ACME",
    model: "Sedan",
  },
];

export type Car = (typeof mockedCars)[number];

export const mockedRefuelings = [
  {
    carId: "1bb94e0a-534c-43cd-920d-a118b849c156",
    refuelings: [
      {
        id: "7d8a460a-0249-48e3-932d-08e6d55514ff",
        datetime: "2024-01-01",
        place: "Example",
        cost: 50,
        quantity: 50,
        price: 1,
        isFull: false,
        isNecessary: true,
        trip: 500,
        odometer: 1000,
      },
    ],
  },
];

export const mockedRefuelingStats = [
  {
    carId: "1bb94e0a-534c-43cd-920d-a118b849c156",
    fuelCosts: {
      thisMonth: 0,
      fromLastMonth: null,
    },
    distance: {
      average: 0,
      lastYear: null,
      total: null,
    },
    fuelEconomy: {
      last: 0,
      fromUsual: null,
    },
  },
];
