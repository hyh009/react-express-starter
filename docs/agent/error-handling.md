# Error Handling Design

## Philosophy

This project follows a simple rule:

```txt
Expected errors → handled and returned to client
Unexpected errors → hidden from client, logged internally
```

---

## Error Types

### 1. AppError (Operational Error)

Used for predictable, business-level errors:

- Validation error
- Resource not found
- Bad request

Example:

```ts
throw new NotFoundError("Product not found");
```

---

### 2. Unexpected Error

Examples:

- Runtime exception
- Database crash
- Undefined access

These should NOT expose internal details.

---

## Error Flow

```txt
Route / Service
→ throw AppError or normal Error
→ errorHandler
→ response to client
```

---

## Error Handling Strategy

### In errorHandler

```txt
if AppError → return message
else → return generic 500 error
```

---

## Response Format

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Bad request"
}
```

---

## Production Safety

Never expose:

- stack trace
- database errors
- internal logic

Instead return:

```txt
Internal Server Error
```

---

## Development Mode

In development, include:

- stack trace
- full error object

---

# When to Add Special Error Mapping

Only add special mapping when an external library throws an error that should be converted into a client-safe HTTP response.

Examples:

- ZodError → 400 Bad Request
- Mongo duplicate key error → 409 Conflict
- Mongoose CastError → 400 Bad Request

Do not add special handling for every error type. Unknown errors should remain 500 and be logged internally.

Example:

```ts
if (err instanceof ZodError) {
  // convert to 400
}
```

---

## Summary

```txt
Use AppError for all business logic errors
Avoid exposing internal errors
Keep errorHandler simple and centralized
```
