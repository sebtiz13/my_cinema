# My Cinema

Fullstack application in typescript to manage a personal Movies library

## What's inside?

- `api`: a [NestJS](https://nestjs.com/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Commands

### Oneline start command in docker

```shell
docker compose --profile fullstack up -d
```

### Development

Start fullstack in development mode

```shell
npm run dev
```

### Build applications

Build backend and frontend applications

```shell
npm run build
```

### Test applications

Run tests of backend and frontend applications

```shell
npm run test
```

### Lint code

Lint backend and frontend code

```shell
npm run lint
```

### Format code

Format backend and frontend code

```shell
npm run test
```
