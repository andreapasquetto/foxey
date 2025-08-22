import { z } from "zod";

const envSchema = z
  .object({
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_HOST: z.string().min(1),
    POSTGRES_PORT: z.coerce.number().int(),
    POSTGRES_DBNAME: z.string().min(1),
    POSTGRES_CONNECTION_STRING: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
  })
  .transform((data) => ({
    database: {
      user: data.POSTGRES_USER,
      password: data.POSTGRES_PASSWORD,
      host: data.POSTGRES_HOST,
      port: data.POSTGRES_PORT,
      dbName: data.POSTGRES_DBNAME,
      connectionString: data.POSTGRES_CONNECTION_STRING,
    },
  }));

export const env = envSchema.parse(process.env);
