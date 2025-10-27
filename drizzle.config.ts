import { env } from "@/common/env";
import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  schema: "./src/db/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.database.connectionString,
  },
  verbose: true,
});

export default config;
