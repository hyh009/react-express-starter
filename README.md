# Node.js Monorepo Starter

Backend starter template using Express, TypeScript, and pnpm workspaces.

## Features

- Express API with versioned routes under `/api/v1`
- TypeScript with `NodeNext` module resolution
- Path alias support with `@src/*`
- MongoDB and Redis Docker Compose setup
- Centralized environment validation with Zod
- Structured logging with Pino
- Request ID and request completion logging middleware
- Centralized `AppError` error handling
- Swagger/OpenAPI documentation
- Basic API security middleware with Helmet, CORS, cookie parsing, and JSON body limits
- Vitest and Supertest API test setup

## Project Structure

```txt
.
├─ apps/
│  └─ api/
│     ├─ docker/
│     ├─ src/
│     │  ├─ config/
│     │  ├─ middlewares/
│     │  ├─ routes/
│     │  ├─ services/
│     │  ├─ types/
│     │  └─ utils/
│     ├─ tests/
│     ├─ package.json
│     └─ tsconfig.json
├─ docs/
│  └─ agent/
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
└─ README.md
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create the API environment file:

```bash
cp apps/api/.env.example apps/api/.env
```

Start MongoDB and Redis:

```bash
pnpm --filter api up
```

Start the API development server:

```bash
pnpm --filter api dev
```

Test the health endpoint:

```bash
curl http://localhost:9000/api/v1/health
```

Open Swagger docs:

```txt
http://localhost:9000/docs
```

## API Scripts

Run commands from the repository root:

```bash
pnpm --filter api dev
pnpm --filter api build
pnpm --filter api lint
pnpm --filter api lint:fix
pnpm --filter api test
pnpm --filter api test:watch
pnpm --filter api up
pnpm --filter api down
pnpm --filter api logs
```

## Environment Variables

The API validates environment variables on startup.

Create `apps/api/.env` from `apps/api/.env.example`:

```env
NODE_ENV=development
PORT=9000
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://mongo:27017/app_db?replicaSet=rs0
REDIS_URL=redis://localhost:6379
```

## API Routes

```txt
/api
└─ /v1
   └─ /health
```

Example:

```txt
GET /api/v1/health
```

## Path Alias

Use `@src/*` for API source imports:

```ts
import routes from '@src/routes';
```

Configured in `apps/api/tsconfig.json`:

```json
"paths": {
  "@src/*": ["src/*"]
}
```
