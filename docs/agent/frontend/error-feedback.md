# Frontend Error Feedback

Use this guide when handling frontend API errors.

## Goal

Keep domain errors close to the page or feature that owns them.

For toast and modal presentation, see:

```txt
docs/agent/frontend/shared-feedback-ui.md
```

## Error Flow

```txt
Backend error response
  -> API client normalizes error
  -> Service throws ApiError
  -> Page workflow maps domain meaning
  -> Feature action writes page/domain error state
  -> View renders inline error
```

## Core Rules

- Do not create a global error store.
- API and service files do not call UI feedback APIs.
- Feature stores keep page/domain error state only.
- Feature actions only mutate store state.
- Page workflows may map API errors into page-level outcomes.
- Keep catch blocks small: delegate API error mapping to named mapper functions.
- Use inline state when the error is part of the page data.
- Use shared feedback UI only when the error needs toast or modal presentation.

## Placement

```txt
src/
  api/
    apiError.ts
    index.ts

  models/
    apiError.types.ts
```

## API Errors

Before mapping frontend errors, check the backend Swagger/OpenAPI route docs.

Use the documented response contract as the source of truth for:

- possible HTTP status codes
- application error `code` values
- `details` shape, especially validation errors
- whether an error is domain-specific or route-level

Do not guess domain meaning from HTTP status alone.

The backend error response shape is:

```json
{
  "status": "error",
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "Invalid request body",
  "details": []
}
```

The API layer should normalize failed requests into an `ApiError`.

Keep backend response types in `src/models`.

Keep fetch helpers and normalization logic in `src/api`.

Services should return frontend models on success and throw `ApiError` on failure.

## Workflow Mapping

Avoid writing different inline `catch` styles in every workflow.

Prefer:

```txt
catch error
  -> mapErrorToResult(error)
  -> feature action updates page state
  -> return page outcome
```

Use API helpers for generic checks such as network or server failures.

Keep page/domain-specific code mapping in a named workflow mapper.

## Inline Errors

Use feature store state for errors that belong to the current page data.

Examples:

- list load failed
- detail item not found
- form validation message
- save failed while the form stays open

Store state may start simple:

```ts
type PageError = string | null
```

Use a structured error only when the UI needs code or details:

```ts
type PageError = {
  message: string
  code?: string
  details?: unknown[]
}
```

## Presentation Decisions

Use inline state when the error is part of the page data.

Use `docs/agent/frontend/shared-feedback-ui.md` when the error needs toast or modal presentation.
