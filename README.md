# Foxey

A little Next.js project that speeds up the tracking process of various parts of my life.

## Development

### Database

This project is still a work in progress. At the moment I'm using a PostgreSQL container with Docker:

```sh
docker run -d \
-p ${YOUR_PORT}:5432 \
-e POSTGRES_DB="${YOUR_DB_NAME}" \
-e POSTGRES_PASSWORD="${YOUR_PASSWORD}" \
postgres
```

Then, create a `.env` file following the structure of `.env.example` file. \
Then, update the DB schema by running `npm run db:push`. \
To browse the DB and execute basic CRUD operations onto it, start Drizzle Studio by running `npm run db:explore`.

See [.env.example](.env.example) for environment variables.
