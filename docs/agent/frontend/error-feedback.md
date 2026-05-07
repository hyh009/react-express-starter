# Frontend Error Feedback

Use this guide when handling frontend API errors, toasts, or shared modals.

## Goal

Keep domain errors close to the page or feature that owns them.

Use app-level feedback only for shared UI containers such as toast and modal hosts.

## Error Flow

```txt
Backend error response
  -> API client normalizes error
  -> Service throws ApiError
  -> Page workflow maps domain meaning
  -> Page VM decides presentation
  -> View renders inline error or opens feedback UI
```

## Core Rules

- Do not create a global error store.
- API and service files do not call toast or modal APIs.
- Feature stores keep page/domain error state only.
- Feature actions only mutate store state.
- Page workflows may map API errors into page-level outcomes.
- Page VM hooks may call app-level feedback VM methods.
- Views render inline errors and mount shared feedback hosts.
- Use app-level state for the active modal and toast queue.
- Use shared components for generic modal and toast UI.

## Placement

```txt
src/
  api/
    apiError.ts
    index.ts

  models/
    apiError.types.ts

  app/
    stores/
      feedback.store.ts
    viewModel/
      feedback.vm.ts

  shared/
    components/
      feedback/
        ModalHost.tsx
        ToastHost.tsx
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

## Toasts And Modals

Toast and modal state belongs to `src/app`, not `src/shared`.

`src/shared` owns reusable UI components.

`src/app` owns this application's active toast and modal instance.

Allowed:

```txt
Page VM Hook -> feedback VM -> feedback store -> shared host renders
```

Not allowed:

```txt
Service -> toast/modal
Feature action -> toast/modal
Feature store -> toast/modal
```

## Confirm Modals

Prefer an async confirm API for user decisions:

```ts
const confirmed = await feedback.confirm({
  title: 'Delete todo?',
  message: 'This action cannot be undone.',
  confirmLabel: 'Delete',
})
```

Rules:

- Keep callbacks only while the modal is open.
- Clear callbacks when the modal closes.
- Do not store callbacks in domain feature stores.
- Do not pass UI callbacks through services.

## Presentation Decisions

Use inline state when the error is part of the page data.

Use toast when the error or success message is temporary and does not require a decision.

Use modal when the user must confirm, choose, or acknowledge a blocking condition.
