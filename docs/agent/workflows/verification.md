# Verification Workflow

Use this guide before finishing code or documentation changes.

## Choose Commands

Run the narrowest useful commands first.

Backend-only change:

```bash
pnpm --filter api run test
pnpm --filter api run lint
pnpm --filter api run build
```

Frontend-only change:

```bash
pnpm --filter web run lint
pnpm --filter web run build
```

Also run the frontend architecture checklist when frontend code changes:

```txt
docs/agent/frontend/architecture-validation.md
```

Full-stack or workspace-level change:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

Docs-only change:

- No lint or build is required unless the docs reference commands, scripts, env vars, routes, generated output, or behavior that should be checked.

## Manual Checks

If a change needs user manual testing, list the specific checks in the final response.

Manual checks are useful when behavior depends on:

- browser interaction
- visual layout
- auth or cookie flows
- external services
- local database or Redis state
- environment-specific behavior
- a path that cannot be fully covered by the commands you ran

Keep manual checks concrete. Name the page, action, endpoint, or user flow to test.

## When Commands Fail

If a command cannot run because of sandboxing, missing services, or local environment issues:

- report the exact command
- report the exact blocker
- explain what was still verified
- do not claim the code is fully verified

## Before Finishing

- Check `git status --short`.
- Confirm changed files match the requested work.
- If verification leads to code changes, rerun the relevant tests and verification commands.
- Report verification commands and results.
- When tests were added or updated, summarize the important behavior they cover.
- Mention remaining risks or manual checks.
