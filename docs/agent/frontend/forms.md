# Frontend Forms

Use this guide when adding or changing frontend forms.

## Default

Do not install a form library by default.

Use the existing page VM and workflow pattern:

- Page VM owns form values, field errors, and field setters.
- Page workflow handles submit flows and service calls.
- Shared form components handle layout and accessibility only.
- Validation can start as small pure functions near the page workflow.

## Shared Components

Use `Field` for label, description, error, and accessibility wiring:

```tsx
<Field label="Name" error={vm.errors.name}>
  <Input
    value={vm.form.name}
    onChange={(event) => vm.setField('name', event.target.value)}
  />
</Field>
```

Shared form components live in:

```txt
src/shared/components/form
```

shadcn primitives live in:

```txt
src/shared/components/ui
```

Do not use shadcn `Form`, `FormField`, `FormItem`, `FormControl`, or `FormMessage` by default. They do not match this app's page VM and workflow form baseline.

Prefer simple shared wrappers such as `Field` plus shadcn UI primitives.

## Boundaries

Shared form components should not:

- own form state
- call services
- call feature stores
- run submit workflows
- know page VM shape
- encode business validation rules

Keep form-specific behavior in the page VM or page workflow.
