export const mockedEvents = [
  {
    id: "0cb6c7c9-7a0c-42a3-8a03-275f3c3bf713",
    type: "Appointment",
    startDatetime: "2024-01-01",
    endDatetime: null,
    isAllDay: true,
    name: "Meeting",
    description: null,
  },
  {
    id: "d8b303a6-99b4-47ed-8fe9-292fc4992dc0",
    type: "Work",
    startDatetime: "2024-06-01T09:00:00",
    endDatetime: "2024-06-01T10:00:00",
    isAllDay: false,
    name: "Interview",
    description: null,
  },
];

export type Event = (typeof mockedEvents)[number];
