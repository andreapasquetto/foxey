export const mockedWallets = [
  {
    id: "55552886-cfdd-4340-b55b-4a9a82fa3f80",
    name: "ACME Investing",
    balance: 0,
  },
];

export type Wallet = (typeof mockedWallets)[number];

export const mockedTransactions = [
  {
    id: "5cf5587a-77ca-4f97-917b-368555a07229",
    datetime: "2024-01-01",
    type: "incoming",
    from: null,
    to: "55552886-cfdd-4340-b55b-4a9a82fa3f80",
    amount: 1234,
    categories: {
      primary: "income",
      secondary: "salary",
    },
    description: "Example",
  },
];

export type Transaction = (typeof mockedTransactions)[number];

export const mockedStats = [
  {
    walletId: "55552886-cfdd-4340-b55b-4a9a82fa3f80",
    stats: {
      income: {
        totalMonthly: 0,
        fromPreviousMonth: null,
      },
      expenses: {
        totalMonthly: 0,
        fromPreviousMonth: null,
      },
      profit: {
        totalMonthly: 0,
        percentage: null,
        fromPreviousMonth: null,
      },
    },
  },
];
