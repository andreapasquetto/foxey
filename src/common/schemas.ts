import z from "zod";

export const requiredStringSchema = z
  .string()
  .trim()
  .min(1, { error: "Required" });

export const nullableStringSchema = z.string().trim().nullable();

export const positiveRequiredNumberSchema = z
  .number({ error: "Required" })
  .positive({ error: "Value must be positive" });

export const positiveNullableNumberSchema = z
  .number()
  .positive({ error: "Value must be positive" })
  .nullable();
