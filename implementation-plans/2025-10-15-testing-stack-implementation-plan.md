# Vitest + Playwright Testing Implementation Plan

## Executive Summary

Establish a unified testing strategy across the monorepo using Vitest for unit/integration (React Testing Library + jsdom) and Playwright for E2E. Integrate with Turborepo and pnpm, enforce TypeScript-first conventions, and wire tests into CI with artifacts and coverage reporting.

## Technical Analysis (Current State)

- Monorepo managed with pnpm + Turborepo.
- Apps: `apps/web` (Next.js 15, React 19, Turbopack).
- Packages: `packages/ui` (React lib), `packages/seo` (TS lib), `packages/db` (drizzle), `packages/eslint-config`, `packages/typescript-config`.
- No test frameworks configured yet.
- TypeScript configs centralized in `@workspace/typescript-config`.
- ESLint configs centralized in `@workspace/eslint-config`.

## Dependencies & Prerequisites

- Vitest stack: `vitest`, `@vitest/coverage-v8`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/dom`, `jsdom`.
- Playwright stack: `@playwright/test` (+ `npx playwright install --with-deps` on CI Linux).
- Optional: `msw` for network mocking in unit/integration tests.
- Node >= 20 (already enforced). pnpm@10, Turborepo configured.

## Architecture Overview

- Unit tests colocated next to source (`*.test.ts(x)`), libraries default to node env, React code uses jsdom.
- Integration tests live close to feature boundaries or under `tests/integration` per package.
- E2E tests under repository root `e2e/` targeting `apps/web` with Playwright shared config.
- Separate Vitest configs per package/app, plus a minimal base config in `packages/typescript-config` or root for reuse.
- CI matrix runs: unit (Vitest) and e2e (Playwright) in parallel; coverage threshold for new code >= 80%.

## Implementation Phases

### Phase 1: Add shared testing configs (low)

- Add `vitest.base.config.ts` at repo root for shared defaults.
- Add `test/setup.ts` for jsdom + RTL globals, add custom `render` helper if needed.
- Ensure TS path aliases work in tests (vite alias or tsconfig paths).
- Deliverables: base config + setup file; referenced by per-package Vitest configs.

### Phase 2: Configure Vitest in packages and app (medium)

- In `apps/web`, create `vitest.config.ts` extending base with `environment: 'jsdom'` and Next/React-specific aliases.
- In `packages/ui`, `environment: 'jsdom'`.
- In `packages/seo`, `environment: 'node'` by default.
- In `packages/db`, `environment: 'node'`, mock database where appropriate.
- Add `test` and `test:coverage` scripts in each package and workspace root `turbo` pipeline.
- Deliverables: runnable `pnpm -w test` invoking package tests, coverage output per package.

### Phase 3: Seed example unit/integration tests (low)

- `packages/ui`: test `button.tsx` rendering and interactions (RTL + user-event).
- `packages/seo`: test pure functions and schema generation.
- `apps/web`: test a server component utilities and client component behavior with jsdom.
- Deliverables: passing example tests to validate config.

### Phase 4: Add Playwright for E2E (medium)

- Add `playwright.config.ts` at repo root. Projects: chromium, firefox, webkit. Base URL from `apps/web` dev server.
- Create `e2e/` with basic smoke tests: home page renders, navigation, dark mode toggle.
- Add `dev-server` configuration to start Next.js before tests, or use `webServer` in Playwright config.
- Deliverables: `pnpm -w test:e2e` passes locally.

### Phase 5: CI integration with GitHub Actions (medium)

- Add workflow with two jobs: `test-unit` (Vitest) and `test-e2e` (Playwright). Cache pnpm/turbo. Upload Playwright trace/video on failure. Run `npx playwright install --with-deps` on Linux.
- Enforce coverage report upload as artifact and minimum threshold.
- Deliverables: green CI, artifacts available.

### Phase 6: Coverage, quality gates, and reporting (low)

- Enable `@vitest/coverage-v8` with thresholds: branches/statements/functions/lines >= 80% for new code.
- Configure per-package coverage output to `coverage/` and aggregate at root via `turbo run test:coverage`.
- Deliverables: coverage reports and failing pipeline on threshold breach.

### Phase 7: DX polish and docs hooks (low)

- Add root scripts: `test`, `test:unit`, `test:coverage`, `test:e2e`, `test:ui` (Playwright UI).
- Pre-push hook to run `pnpm -w test -w` for changed packages using `turbo`’s filtering.
- ESLint rule exceptions for test files if needed.
- Deliverables: streamlined developer experience.

### Phase 8: Unit Testing Phase (mandatory)

- Tools: Vitest, RTL, jsdom, MSW for HTTP.
- Requirements: 80%+ coverage new code, deterministic tests, no hidden timers.
- Structure: colocate tests, use `data-testid` only when necessary, prefer accessible queries.
- CI: run on PR and push, cache node/pnpm/turbo, upload coverage.

### Phase 9: Documentation Phase (mandatory)

- Add `/docs/testing/` (VitePress-ready) or extend existing docs with:
    - How to run unit/e2e tests, add new tests, debug tests.
    - Testing patterns for server components, client components, and packages.
    - Playwright POM examples and trace viewer usage.
    - CI expectations, coverage thresholds, and failure triage.

## Folder Structure (proposed)

- `vitest.base.config.ts`
- `test/setup.ts`
- `e2e/` (Playwright tests)
- `apps/web/vitest.config.ts`
- `packages/ui/vitest.config.ts`
- `packages/seo/vitest.config.ts`
- `packages/db/vitest.config.ts`

## Configuration Changes

- Root `package.json` add scripts:
    - `test`: `turbo run test`
    - `test:coverage`: `turbo run test:coverage`
    - `test:e2e`: `playwright test`
    - `test:e2e:ui`: `playwright test --ui`
- Turborepo: add `test` and `test:coverage` tasks with proper inputs/outputs.
- TS: include `vitest/globals`, `@testing-library/jest-dom` types where used.

## Risk Assessment

- Flaky E2E: mitigate via auto-waiting, stable selectors, retries, tracing.
- Next.js server components: unit-test pure helpers; integration tests for RSC boundaries.
- CI resource usage: use shards, parallelism, and selective `turbo run` filters.
- Cross-package path aliasing: ensure vite alias mirrors tsconfig paths.

## Success Metrics

- 80%+ coverage for new/changed lines.
- <10 min CI for unit; <15 min for E2E across 3 browsers (can limit to Chromium in PRs).
- Zero flaky tests over 2 consecutive weeks.
- Developer satisfaction: tests run locally under 2 minutes for changed packages.

## References

- Vitest docs: https://vitest.dev
- RTL: https://testing-library.com/docs/react-testing-library/intro
- Playwright: https://playwright.dev/docs/intro
- Next.js Testing: https://nextjs.org/docs/app/building-your-application/testing
- Turborepo: https://turbo.build/repo/docs
- MSW: https://mswjs.io/docs
