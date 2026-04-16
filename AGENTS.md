# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 14 App Router project for interview scheduling and reminders. Application routes live in `src/app`, including page routes such as `src/app/interviews/*` and API handlers under `src/app/api/*`. Reusable UI components live in `src/components`, and shared services such as Prisma and Resend clients live in `src/lib`. Database schema changes belong in `prisma/schema.prisma`. Planning and design notes are stored in `docs/superpowers/`.

## Build, Test, and Development Commands
- `npm run dev` starts the local Next.js dev server.
- `npm run build` runs `prisma generate` and then creates the production build.
- `npm run start` serves the production build locally.
- `npm run lint` runs the Next.js ESLint checks.
- `npm run db:push` syncs the Prisma schema to the configured database.
- `npm run db:generate` regenerates the Prisma client after schema changes.
- `npm run db:studio` opens Prisma Studio for local data inspection.

## Coding Style & Naming Conventions
Use TypeScript with 2-space logical indentation per JSX level as already established in `src/`. Prefer PascalCase for React components (`InterviewForm.tsx`), camelCase for variables and functions, and lowercase route segment folders (`src/app/settings`). Keep utility modules small and focused. Use Tailwind utility classes in JSX; keep global styling in `src/app/globals.css`. Run `npm run lint` before opening a PR.

## Testing Guidelines
There is currently no dedicated test framework configured in `package.json`. For now, treat `npm run lint`, a production build via `npm run build`, and manual checks of the main flows as the minimum gate. When adding tests, place them next to the feature or in a small `tests/` directory and use descriptive names such as `interview-form.test.ts`.

## Commit & Pull Request Guidelines
Follow the existing history: Conventional Commit prefixes like `feat:` and `fix:` are the current standard. Keep commit subjects short and specific, for example `fix: lazy initialize Resend client`. PRs should include a brief summary, note any schema or environment changes, link related issues, and include screenshots for UI changes.

## Security & Configuration Tips
Copy `.env.example` to `.env` and provide `DATABASE_URL`, `RESEND_API_KEY`, and `CRON_SECRET`. Do not commit secrets. If you change reminder or cron behavior, verify the matching API route under `src/app/api/cron/check-reminders`.
