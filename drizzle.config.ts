import { env } from "@/common/env";
import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  dbCredentials: {
    user: env.database.user,
    password: env.database.password,
    host: env.database.host,
    port: env.database.port,
    database: env.database.dbName,
  },
  dialect: "postgresql",
  schema: "./src/db/schemas/*",
  verbose: true,
});

export default config;
