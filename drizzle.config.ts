import { defineConfig } from "drizzle-kit";
import { env } from "@/common/env";

const config = defineConfig({
  schema: "./src/db/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.database.connectionString,
  },
  verbose: true,
});

export default config;
