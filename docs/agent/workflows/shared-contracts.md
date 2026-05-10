# Shared API Contracts

Use this guide when changing `packages/shared`.

## Boundary

`@repo/shared` is for public HTTP contracts shared by API and Web:

- request/response DTO types
- response envelopes and error details
- stable public enums/unions
- zod schemas used at API boundaries

Keep backend internals out of shared:

- Mongo/Mongoose schemas
- repository/service types
- password hashes, refresh-token hashes, session entities
- frontend VM/store/UI state

## Usage

- API routes may import shared zod schemas for `validate(...)`.
- API routes may import shared request/response types for Express route generics.
- Backend models and services should define their own domain/input/output types and only reuse shared public enums/unions when useful.
- Web services may import shared DTO and response types, then map DTOs into frontend models in `src/models`.
- If an API response shape differs by endpoint, create a separate contract type instead of forcing a generic one.
