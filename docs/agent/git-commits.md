# Git Commits

Use this guide only when the user directly asks you to create a git commit.

Do not create a commit just because code changes are complete. Wait until the user explicitly asks for a commit.

## Before Committing

Always inspect the working tree first:

```bash
git status --short
git diff --stat
```

If there are untracked files or modified files that are not part of the requested work, do not include them.

Do not commit local drafts, temporary files, generated scratch files, or unrelated user changes unless the user explicitly asks for them.

## What to Stage

Stage only files that belong to the completed task.

Prefer explicit paths:

```bash
git add path/to/file path/to/other-file
```

Avoid broad staging commands such as:

```bash
git add .
git add -A
```

Use broad staging only when the user explicitly asks to commit everything and the working tree has been reviewed.

## Commit Message Style

Use Conventional Commit style.

Format:

```txt
type(scope): summary
```

Common types:

- `feat` for new behavior or capabilities
- `fix` for bug fixes
- `refactor` for behavior-preserving code changes
- `docs` for documentation-only changes
- `test` for tests
- `chore` for tooling, dependency, or maintenance changes

Use a scope when the change is clearly tied to one package or area.

Common scopes:

- `api`
- `docs`

Examples from this repository:

```txt
feat(api): add structured logging and env validation
feat(api): enhance error mapping and backend error docs
refactor(api): improve health service testability with factory function
fix(api): fix health route path nesting to resolve 404 error
```

## Message Rules

Keep the summary:

- lowercase after the scope
- imperative or action-oriented
- concise
- specific enough to identify the change

Do not add a long body unless the change needs extra context.

## After Committing

Report:

- commit hash
- commit message
- any remaining untracked or modified files
