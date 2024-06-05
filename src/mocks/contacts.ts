export const mockedContacts = [
  {
    id: "f24a571b-ec6d-4998-a295-d71a0cdadbec",
    name: {
      given: "John",
      family: "Doe",
    },
    isOrganization: false,
    dateOfBirth: "2000-01-01",
    emails: [
      {
        type: "EXAMPLE",
        value: "johndoe@example.com",
      },
    ],
    phoneNumbers: [
      {
        type: "CELL",
        value: "+15001234567",
      },
    ],
    addresses: [
      {
        type: "HOME",
        value: "Main Street, 1",
      },
    ],
  },
  {
    id: "f24a571b-ec6d-4998-a295-d71a0cdadbec",
    name: {
      given: "ACME Inc.",
      family: null,
    },
    isOrganization: true,
    dateOfBirth: null,
    emails: [
      {
        type: "ACME",
        value: "info@acme.inc",
      },
    ],
    phoneNumbers: [
      {
        type: "CELL",
        value: "+15009876543",
      },
    ],
    addresses: [
      {
        type: "HQ",
        value: "Secondary Street, 1",
      },
    ],
  },
];

export type Contact = (typeof mockedContacts)[number];
