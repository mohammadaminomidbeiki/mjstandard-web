# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 14 App Router project written in TypeScript. Route files live in `app/` and are organized by page segment such as `app/about/page.tsx` and `app/services/page.tsx`. Shared UI lives in `components/`, mostly under `components/site/`. Static content and structured page data live in `data/`. Global and route-specific styles are kept in `app/*.css` and `components/**/*.module.css`. Public assets belong in `public/`, and small utility data files live in `util/`.

## Build, Test, and Development Commands
- `npm run dev` — start the local Next.js development server.
- `npm run build` — create a production build.
- `npm run start` — serve the production build locally.
- `npm run lint` — run the Next.js ESLint checks.

Use `npm` because `package-lock.json` is present. Install dependencies with `npm install` if needed.

## Coding Style & Naming Conventions
Use TypeScript for all new code. Follow the existing semicolon-free style and prefer double quotes in `ts` and `tsx` files. Match the surrounding file’s indentation before reformatting unrelated lines; current files use simple, readable indentation rather than a strictly enforced formatter. Use:
- `PascalCase` for React components
- `camelCase` for variables and functions
- `kebab-case` for route segment folders
- descriptive data filenames such as `data/services.ts`

Keep imports grouped simply, and prefer the `@/*` path alias when it improves readability.

## Testing Guidelines
There is currently no dedicated automated test framework configured in this repository. At minimum, run `npm run lint` before submitting changes. For UI or content updates, manually verify affected pages in `npm run dev`. If you add tests later, place them near the feature or in a clearly named test directory and use `*.test.ts(x)` or `*.spec.ts(x)`.

## Commit & Pull Request Guidelines
Recent Git history uses short, compact commit messages such as `v3`, `v2.8`, and `blog`. Prefer clearer imperative messages going forward, for example `Add homepage accreditation cards` or `Fix RTL navigation spacing`. Keep pull requests focused, include a short summary, list affected routes/components, and attach screenshots for visual changes.

## Content & Configuration Notes
This project includes Persian RTL content. Preserve `dir="rtl"` behavior and validate layout changes carefully. Do not commit local build output or temporary QA artifacts unless they are intentionally part of the change.
