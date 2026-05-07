# Backend Architecture Diagram

Quick reference for backend work.

## Startup Flow

```txt
server.ts
  |
  +--> load env from config/env.ts
  |
  +--> connect MongoDB via config/db.ts
  |
  +--> connect Redis via config/db.ts
  |
  +--> createApp()
  |
  v
HTTP server listens on env.PORT
```

## Request Flow

```txt
HTTP request
  |
  v
createApp()
  |
  v
Middleware
  |
  +--> requestId
  +--> requestLogger
  +--> helmet
  +--> cors
  +--> cookieParser
  +--> express.json
  |
  v
/api routes
  |
  v
Route handler
  |
  v
Service
  |
  +--> models / MongoDB
  +--> Redis
  +--> external integrations
  |
  v
Response
```

## Error Flow

```txt
Route / service throws AppError or unknown error
  |
  v
Express next(error)
  |
  v
Global error handler
  |
  +--> map error
  +--> log when needed
  |
  v
JSON error response
```

## Placement

```txt
App construction
  -> src/app.ts

Server startup
  -> src/server.ts

Environment, database, CORS config
  -> src/config

Express middleware
  -> src/middlewares

Versioned routes
  -> src/routes/v1

Business logic
  -> src/services

MongoDB models
  -> src/models

Shared backend utilities
  -> src/utils

Express type declarations
  -> src/types

Backend tests
  -> tests
```

## Folder Map

```txt
apps/api/
  src/
    app.ts
    server.ts
    config/
    middlewares/
    models/
    routes/
      index.ts
      v1/
        index.ts
        <feature>.ts
    services/
    types/
    utils/

  tests/
    setup/
    <feature>.test.ts
```

Create `src/models` when the first persistent MongoDB model is added.
