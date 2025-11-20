import z from "zod";

export const requiredStringSchema = z
  .string()
  .trim()
  .min(1, { error: "Required" });

export const optionalStringSchema = z.string().trim().optional();

export const positiveRequiredNumberSchema = z
  .number({ error: "Required" })
  .positive({ error: "Value must be positive" });

export const positiveOptionalNumberSchema = z
  .number()
  .positive({ error: "Value must be positive" })
  .optional();
