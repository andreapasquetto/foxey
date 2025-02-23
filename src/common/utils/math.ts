import { Decimal } from "decimal.js";

export function calculatePercentageChange(n1: Decimal.Value, n2: Decimal.Value) {
  const safeN1 = new Decimal(n1);
  return new Decimal(n2).sub(safeN1).div(safeN1.absoluteValue());
}
