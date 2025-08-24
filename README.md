# Foxey

A little Next.js project that speeds up the tracking process of various parts of my life.

## Development

### How to run the project

Create a `.env` file and populate it following the structure of [`.env.example`](.env.example)

| Command              | Action                   |
| -------------------- | ------------------------ |
| `bun run db:push`    | Update the DB schema     |
| `bun run db:explore` | Browse the DB            |
| `bun run dev`        | Start development server |

See [package.json](./package.json) for all the available scripts.

### Auth

At the moment I'm using Clerk. To create a set of API keys, see [clerk.com](https://clerk.com).

### Database

At the moment I'm running a PostgreSQL container using Docker:

```sh
docker run -d \
-p ${POSTGRES_PORT}:5432 \
-e POSTGRES_USER="${POSTGRES_USER}" \
-e POSTGRES_PASSWORD="${POSTGRES_PASSWORD}" \
-e POSTGRES_DB="${POSTGRES_DBNAME}" \
--name="foxey" \
postgres
```

To export data:

```sh
docker exec foxey pg_dump \
--username="${POSTGRES_USER}" \
--dbname="${POSTGRES_DBNAME}" \
--data-only > "$HOME/foxey-$(date +'%Y%m%d_%H%M%S')-dump.sql"
```

To restore data from a previous export:

```sh
docker exec -i foxey psql \
--username="${POSTGRES_USER}" \
--dbname="${POSTGRES_DBNAME}" < /path/to/export.sql
```
