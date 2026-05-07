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
