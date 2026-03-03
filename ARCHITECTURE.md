# Architecture

This project follows a lightweight Bulletproof React structure adapted for a single Next.js app.

## Layers

- `src/app`: Next.js routes, layout, and app-level composition.
- `src/features`: Feature modules (domain logic and feature-scoped UI).
- `src/components`: Shared UI reused across features.
- `src/lib`, `src/config`, `src/types`, `src/utils`: Shared cross-cutting modules.

## Import Rules

- `app` can import from `features`, `components`, `lib`, `config`, `types`, and `utils`.
- `features` can import from shared modules and their own feature files.
- `features` must not import from `app`.
- Keep imports explicit and avoid unnecessary path segments.

## Feature Structure

`src/features/life-calendar` is organized by responsibility:

- `components`: UI specific to the life-calendar feature.
- `hooks`: stateful feature hooks.
- `lib`: pure business utilities.
- `constants`: feature constants.
- `types`: feature-local types.
