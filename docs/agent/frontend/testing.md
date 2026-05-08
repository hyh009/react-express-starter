# Frontend Testing

Use this guide when adding or updating frontend tests.

## Commands

```txt
pnpm --filter web run test
pnpm --filter web run lint
pnpm --filter web run build
```

Use `pnpm --filter web run test:watch` while iterating.

## What To Test

- Test API error normalization in `src/api`.
- Test service success mapping when DTO conversion is part of the change.
- Test page workflow error mapping when backend `code` values affect page behavior.
- Keep component tests optional until the repo has a browser/DOM test setup.

## Placement

- Put API client tests beside `src/api` modules.
- Put page workflow tests beside the page workflow file.
- Use mocked services when testing workflows.
- Do not test store internals through components; test actions/workflows directly when possible.

## API Error Checklist

- Backend error envelopes keep `status`, `statusCode`, `code`, `message`, and `details`.
- Network failures map to `network`.
- 5xx responses map to `server`.
- Invalid JSON or unreadable API JSON maps to `invalid-response`.
- Domain behavior uses documented backend `code` values, not only HTTP status.
