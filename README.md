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
pnpm --filter api run up
```

Start the API development server:

```bash
pnpm --filter api run dev
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
pnpm --filter api run dev
pnpm --filter api run build
pnpm --filter api run lint
pnpm --filter api run lint:fix
pnpm --filter api run test
pnpm --filter api run test:watch
pnpm --filter api run up
pnpm --filter api run down
pnpm --filter api run logs
```

## Environment Variables

The API validates environment variables on startup.

Create `apps/api/.env` from `apps/api/.env.example`:

```env
NODE_ENV=development
PORT=9000
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/app_db?replicaSet=rs0
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
