import { Decimal } from "decimal.js";

export function calculatePercentageChange(v1: Decimal.Value, v2: Decimal.Value) {
  const safeV1 = new Decimal(v1);
  return new Decimal(v2).sub(safeV1).div(safeV1.absoluteValue());
}
