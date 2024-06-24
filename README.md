# Foxey

## Development

### Database

```sh
docker run -d \
-p ${PORT}:5432 \
-e POSTGRES_DB="${DBNAME}" \
-e POSTGRES_PASSWORD="${PASSWORD}" \
postgres
```
