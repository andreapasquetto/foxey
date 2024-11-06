# Foxey

A little Next.js project that speeds up the tracking process of various parts of my life.

## Development

### Database

This project is still a work in progress. At the moment I'm running a PostgreSQL container using Docker:

```sh
docker run -d \
-p ${YOUR_PORT}:5432 \
-e POSTGRES_DB="${YOUR_DB_NAME}" \
-e POSTGRES_PASSWORD="${YOUR_PASSWORD}" \
postgres
```

Create a `.env` file following the structure of [`.env.example`](.env.example).

Run `npm run db:push` to update the DB schema.\
Run `npm run db:explore` to browse the DB and execute basic CRUD operations onto it.
