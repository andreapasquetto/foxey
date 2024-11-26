import { z } from "zod";

export const coercedOptionalString = z.string().transform((value) => {
  if (value === "") return undefined;
  return value;
});
