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

export type Refueling = (typeof mockedRefuelings)[number]["refuelings"][number];

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

export const mockedHighwayTrips = [
  {
    carId: "1bb94e0a-534c-43cd-920d-a118b849c156",
    trips: [
      {
        id: "630c02c1-da79-4b3f-b0b8-2ae26e9268c1",
        datetime: "2024-01-01",
        start: "A4 Milano",
        end: "A4 Padova",
        distance: 250,
        cost: 10,
        avgSpeed: 100,
      },
    ],
  },
];

export type HighwayTrip = (typeof mockedHighwayTrips)[number]["trips"][number];
