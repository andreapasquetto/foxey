export const mockedPlaces = [
  {
    id: "7bad3504-a808-40fc-a429-1ad09d3e43c9",
    addedAt: "2023-01-01",
    category: "Restaurant",
    name: "Beautiful place",
    address: "Main Street, 1",
    coordinates: { lat: "0.0000000", lon: "0.0000000" },
    review: 0.9,
  },
  {
    id: "4d0be415-639e-440e-a163-59cd314164da",
    addedAt: "2023-06-01",
    category: "Beach",
    name: "Beautiful place",
    address: null,
    coordinates: null,
    review: 0.9,
  },
];

export type Place = (typeof mockedPlaces)[number];
