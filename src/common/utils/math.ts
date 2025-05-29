import { Decimal } from "decimal.js";

export function calculatePercentageChange(n1: Decimal, n2: Decimal) {
  return n2.sub(n1).div(n1.absoluteValue());
}
