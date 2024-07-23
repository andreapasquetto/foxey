import { defineConfig } from "drizzle-kit";

if (!process.env.POSTGRES_USER) {
  throw new Error("POSTGRES_USER is not defined.");
}

if (!process.env.POSTGRES_PASSWORD) {
  throw new Error("POSTGRES_PASSWORD is not defined.");
}

if (!process.env.POSTGRES_HOST) {
  throw new Error("POSTGRES_HOST is not defined.");
}

if (!process.env.POSTGRES_PORT) {
  throw new Error("POSTGRES_PORT is not defined.");
}

if (!process.env.POSTGRES_DBNAME) {
  throw new Error("POSTGRES_DBNAME is not defined.");
}

const config = defineConfig({
  dbCredentials: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DBNAME,
  },
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  verbose: true,
});

export default config;
