# Frontend Feature Workflow

Use this guide when a new feature adds or changes frontend behavior in `apps/web`.

## Start Here

- Follow `docs/agent/frontend/architecture.md`.
- Keep the feature slice small enough to validate with lint and build.
- Do not add a new state or data-fetching framework unless the user asks.

## Page and Feature Structure

- Put page views, page VM hooks, and page workflows under `apps/web/src/pages`.
- Put domain feature state, actions, and reusable domain components under `apps/web/src/features/<domain>`.
- Put frontend models and DTO conversion helpers under `apps/web/src/models`.
- Put domain or app services under `apps/web/src/services`.
- Put endpoint paths under `apps/web/src/api/paths` when calling a new API endpoint.
- Keep domain-specific components out of `apps/web/src/shared/components`.

## State and Data Flow

- Components read state and trigger behavior through page VM hooks.
- Page workflows coordinate service calls, actions, loading states, errors, and save flows.
- Feature actions mutate feature stores.
- Stores hold state only.
- Use React local state for UI-only state such as modals, menus, hover state, and temporary input text.
- Keep raw API DTOs out of stores and views when a frontend model is useful.

## API Integration

- Match frontend service calls to the backend contract.
- Convert API DTOs to frontend models before storing or rendering when shapes differ.
- Keep auth, cookie, and error behavior aligned with backend middleware.
- Update `apps/web/.env.example` when a new frontend env variable is required.
- Update README or setup docs when local usage changes.

## Tests

- If no frontend test setup exists, do not add a new test framework unless the user asks.
- Validate frontend changes with lint and build.
- If manual testing is needed, list the concrete checks in the final response.

## Verification

Follow `docs/agent/workflows/verification.md`.
