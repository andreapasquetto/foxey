import { z } from "zod";

const envSchema = z
  .object({
    DARK_MODE: z.literal(["true", "false"]),
    POSTGRES_CONNECTION_STRING: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
  })
  .transform((data) => ({
    isDarkMode: data.DARK_MODE === "true",
    database: {
      connectionString: data.POSTGRES_CONNECTION_STRING,
    },
  }));

export const env = envSchema.parse(process.env);
