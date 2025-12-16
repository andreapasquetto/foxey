import z from "zod";

export const requiredStringSchema = z
  .string()
  .trim()
  .min(1, { error: "Required" });

// TODO: remove
export const optionalStringSchema = z.string().trim().optional();

export const nullableStringSchema = z.string().trim().nullable();

export const positiveRequiredNumberSchema = z
  .number({ error: "Required" })
  .positive({ error: "Value must be positive" });

// TODO: remove
export const positiveOptionalNumberSchema = z
  .number()
  .positive({ error: "Value must be positive" })
  .optional();

export const positiveNullableNumberSchema = z
  .number()
  .positive({ error: "Value must be positive" })
  .nullable();
