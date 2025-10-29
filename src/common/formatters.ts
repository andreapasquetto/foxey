export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export const rawCurrencyFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const numberFormatter = new Intl.NumberFormat("en-US");

export const percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  signDisplay: "always",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

export const unsignedPercentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  signDisplay: "never",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
