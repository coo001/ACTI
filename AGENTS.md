# Repository Guidelines

## Project Structure & Module Organization

This repository contains planning artifacts and the production app. `outputs/` stores staged workflow documents: idea validation, PRD, design specs, and implementation notes. The runnable product lives in `app/`, a Vite + React + TypeScript single-page app.

Inside `app/src/`, use `components/` for reusable UI, `pages/` for route-level screens, `content/` for questions and ACTI type copy, `lib/` for pure logic and integrations, and `styles/globals.css` for tokens and base styles. Keep component CSS next to its component or page, for example `PrimaryButton.tsx` with `PrimaryButton.css`. Serverless email code lives in `app/api/`.

## Build, Test, and Development Commands

Run commands from `app/`.

- `pnpm install`: install dependencies from `pnpm-lock.yaml`.
- `pnpm dev`: start the Vite dev server at `http://localhost:5173`.
- `pnpm build`: type-check with `tsc -b` and build production assets into `dist/`.
- `pnpm preview`: serve the built app locally for release checks.
- `pnpm lint`: run ESLint on the app.
- `pnpm test`: run Vitest once.
- `pnpm test:watch`: run Vitest in watch mode.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow the existing style: 2-space indentation, semicolons, single quotes, named `Props` types, and default exports for page/component files. Name components in PascalCase (`ResultEmailForm.tsx`) and utilities in camelCase (`sendResult.ts`). Keep pure calculations, storage helpers, and SDK wrappers in `src/lib/`; keep Korean ACTI copy in `src/content/`.

## Testing Guidelines

Vitest is the test runner with jsdom setup in `src/test-setup.ts`. Place tests near the code they cover using `*.test.ts` or `*.test.tsx`, as in `src/lib/scoring.test.ts` and `src/content/content.test.ts`. Add tests for scoring, content invariants, localStorage behavior, and any logic that affects result codes or sharing. Run `pnpm test` before opening a PR.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit style with optional scopes, for example `feat(api): log subscribers to Google Sheets webhook` and `fix(api): add .js extensions to relative imports for Node ESM`. Use concise imperative subjects.

PRs should include a short summary, test results (`pnpm test`, `pnpm lint`, `pnpm build` when relevant), linked issues, and screenshots or recordings for visible UI changes. Note required environment variables such as `VITE_KAKAO_APP_KEY`, `VITE_SITE_URL`, and any Resend or webhook configuration.

## Security & Configuration Tips

Keep secrets out of git. Use `.env.local` for local values and platform dashboards for Vercel settings. The app should continue to run without a Kakao key, with Kakao sharing disabled.

## Agent Workflow

Default to Superpowers workflows when starting work, selecting the smallest relevant skill before planning, debugging, implementing, or verifying. Use gstack expert skills for targeted advice when the task benefits from product, design, engineering, QA, or deployment review.

For any security-sensitive change, including secrets, auth, webhooks, dependencies, API handlers, environment variables, CI/CD, deployment settings, or user data handling, run a gstack CSO/security review before considering the work complete.

When a mistake, regression, missed edge case, or repeated workflow problem is found and fixed, document the lesson with Compound Engineering (`ce-compound`) so future agents can discover it and avoid repeating it. Prefer concrete prevention notes: affected files, root cause, verification command, and the rule to follow next time.
