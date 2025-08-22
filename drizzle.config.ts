import { env } from "@/common/env";
import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  schema: "./src/db/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    user: env.database.user,
    password: env.database.password,
    host: env.database.host,
    port: env.database.port,
    database: env.database.dbName,
  },
  verbose: true,
});

export default config;
