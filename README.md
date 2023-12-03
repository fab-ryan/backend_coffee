## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# environment variables if are using docker
```bash
# .env
PORT=5000
ENV=dev
DB_HOST=db // docker host name
DB_PASSWORD=postgres
DB_NAME=events // database name
DB_USERNAME=postgres
DB_TYPE=postgres
DB_PORT=5432

# make docker run commands
docker-compose up -d
docker-compose down
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

## License

Nest is [MIT licensed](LICENSE).
