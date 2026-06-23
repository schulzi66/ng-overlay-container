# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular library (`ng-overlay-container`) that abstracts Angular CDK overlays into a simple service-based API for creating popover/overlay containers. Published to npm with major version tracking the Angular version (v22 = Angular 22).

## Repository Structure

This is an Angular workspace with two projects:

- **Library** (`projects/ng-overlay-container/src/lib/`): The publishable npm package
- **Demo app** (`src/`): A demo/documentation app that consumes the library

The library's public API is defined in `projects/ng-overlay-container/src/public-api.ts`. The tsconfig path alias maps `ng-overlay-container` to this file, so the demo app imports the library as if it were an npm package.

## Common Commands

```bash
npm install --force     # Install dependencies (--force needed due to peer dep conflicts)
npm start               # Serve the demo app (ng serve)
npm test                # Run library tests via Karma (ng test ng-overlay-container)
npm run build-lib:prod  # Build the library for production (ng build ng-overlay-container --configuration production)
npm run build:prod      # Build demo app for production (copies README first)
```

## Testing

Tests use **Karma + Jasmine**. Library specs are in `projects/ng-overlay-container/src/lib/` alongside source files (`.spec.ts` pattern). The test entry point is `projects/ng-overlay-container/src/test.ts`.

```bash
npm test                # Runs all library tests
```

CI runs `npm test` on all pushes and PRs to master.

## Architecture

The library has three core pieces:

1. **`NgOverlayContainerService`** — The main entry point. Injectable service with an `open<T, R>()` method that creates an overlay, attaches a `ComponentPortal` containing `NgPopoverComponent`, and returns a `NgPopoverRef`.

2. **`NgPopoverRef<T, R>`** — Handle returned from `open()`. Exposes `afterClosed$` observable, `close()`, `resize()`, and `toggleMaximize()`. Manages overlay lifecycle and data flow between consumer and overlay content.

3. **`NgPopoverComponent`** — Host component that renders one of three content types (text, `TemplateRef`, or component) determined at runtime via `NgPopoverRenderMethod`.

Provider setup: The service can be provided globally via `provideNgOverlayContainer()` (uses `makeEnvironmentProviders`) or directly in a component's `providers` array.

## Versioning & Publishing

- Library version is in `projects/ng-overlay-container/package.json`
- Major version must match the Angular version (e.g., 22.x.x for Angular 22)
- Publishing is automated via GitHub Actions on push to master (OIDC trusted publishing to npm)
- Build output goes to `dist/ng-overlay-container/`

## Key Conventions

- Standalone components (no NgModule) — the library uses `imports` in `@Component` decorators
- SCSS for styles in the demo app
- `ViewEncapsulation.None` on `NgPopoverComponent` so overlay styles apply globally
- Node version: 24 (see `.nvmrc`); Angular 22 requires Node ≥ 24.15.0 (or ≥ 22.22.3 / ≥ 26)
