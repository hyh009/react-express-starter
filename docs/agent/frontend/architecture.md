# Frontend Architecture

Use this guide when adding or updating frontend code.

## Goal

This project uses React + Zustand with a lightweight MVVM-inspired architecture.

Command flow:

```txt
View -> Page VM Hook -> Page Workflow -> Feature Actions -> Feature Store
                         |
                         v
                       Service -> API
```

State flow:

```txt
Feature Store -> Page VM Hook via useStore(...) -> View re-renders
```

## Core Rules

- Pages live in `src/pages`.
- Each page folder contains the page view, page VM hook, and page workflow.
- Features are based on domain, not page.
- Feature stores and feature actions live under `src/features/<domain>`.
- Zustand stores hold state only.
- Actions mutate store state.
- Page workflow files compose workflows and call services/actions.
- Components never call `store.getState()` or `store.setState()` directly.
- Components use page VM hooks to read state and trigger workflows.
- Global stores only contain app-level context.
- Use camelCase for folder names and normal module names.

## Folder Structure

```txt
src/
  api/
    index.ts
    paths/

  app/
    stores/
    viewModel/

  assets/
  models/
  services/

  pages/
    todoOverview/
      TodoOverviewPage.tsx
      useTodoOverviewPageVM.ts
      todoOverviewPage.workflow.ts
    todoDetail/
      TodoDetailPage.tsx
      useTodoDetailPageVM.ts
      todoDetailPage.workflow.ts

  features/
    todo/
      actions/
      components/
      store/

  shared/
    components/
    hooks/
    utils/
```

## Page Layer

Pages are route/view-based.

Put page-specific files together:

- page component
- page VM hook
- page workflow

Example:

```txt
src/pages/todoOverview/
  TodoOverviewPage.tsx
  useTodoOverviewPageVM.ts
  todoOverviewPage.workflow.ts
```

The page VM hook connects React to Zustand with `useStore`.

The page workflow composes workflows:

- call services
- call feature actions
- coordinate loading / error / save flows
- expose computed helpers when useful

## Feature Layer

Features are domain-based.

Feature folders own reusable domain logic and state transitions:

```txt
src/features/todo/
  actions/
  components/
  store/
```

Feature folders should not contain page folders.

## State Categories

App-level state is used across multiple pages or features.

Place app-level store files in `src/app/stores`.

Examples:

- current user
- authentication status
- access token
- permissions
- current organization
- global theme

Feature-level state belongs to one domain feature.

Place feature-level store files in `src/features/<domain>/store`.

Examples:

- todo overview list
- todo detail state
- editor form state
- dashboard filters

UI-level state is local to one component.

Use React `useState`.

Examples:

- modal open / close
- dropdown state
- hover state
- temporary input value

Do not put UI-level state in Zustand.

## Store

Stores hold state only.

Store folders contain only `*.store.ts` files.

Do not put VM, actions, hooks, services, API calls, or workflow logic in `store` / `stores`.

Feature-level stores should usually export factory functions, so feature/page state is not accidentally global.

## Actions

Actions mutate store state.

Feature actions belong in `src/features/<domain>/actions`.

Feature actions should usually be created with factory functions that receive a feature store instance.

Actions may call:

- `store.getState()`
- `store.setState()`

Actions should not keep hidden internal state.

## Services

Use root-level `src/services` for service modules.

Services handle domain/app calls and external integrations.

Base API client and endpoint paths stay in `src/api`.

## Models

Use root-level `src/models` for frontend model/type definitions.

Backend models are centralized under `apps/api/src/models`.

Do not put model/type files inside feature folders.

## Components

Place components by ownership:

- Page-only components: `src/pages/<pageName>`
- Same domain, multiple pages: `src/features/<domain>/components`
- Project-level reusable: `src/shared/components`

Do not put domain-specific components in `shared/components`.

## Shared Hooks

`src/shared/hooks` is only for generic reusable hooks that can be used across projects.

Examples:

- `useDebouncedValue`
- `useThrottle`

Do not put page VM hooks or domain-specific hooks in `shared/hooks`.

## Naming

Use camelCase for folders and normal module names.

Examples:

- `todoOverview`
- `todoDetail`
- `viewModel`
- `todoOverview.store.ts`
- `todoDetail.actions.ts`
- `todoOverviewPage.workflow.ts`

React component files and component exports use PascalCase.
