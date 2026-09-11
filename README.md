# Deep Dive AI

An interactive visual learning platform for Artificial Intelligence, Machine
Learning, and Deep Learning.

## Purpose

Most AI/ML courses are long-form text, video, and multiple-choice quizzes.
Deep Dive AI teaches through direct interaction instead:

**See → Explore → Interact → Understand → Practice → Connect → Go Deeper**

The curriculum is a graph, not a folder structure: concepts carry
prerequisites, related-concept links, and per-track relationships (AI → ML →
DL, with GenAI and a practical "Use AI" track planned), so navigation and
curriculum completeness checks are data-driven rather than hardcoded.

This is an early-stage project. The homepage, lessons, playgrounds, and
quizzes described in the architecture below are not built yet — this repo
currently establishes the foundation they'll be built on.

## Architectural philosophy

- **The curriculum is data, not pages.** Concepts, prerequisites, and status
  live in `src/curriculum/metadata` as a validated (Zod) schema. Adding a
  concept never means hand-wiring a new route.
- **Every domain gets its own seam.** Lesson content, curriculum metadata,
  quizzes, playgrounds, simulations, and progress tracking are separated so
  each can grow independently — see [Folder responsibilities](#folder-responsibilities).
- **Simulation logic never imports React.** A simulation (e.g. gradient
  descent) is a pure function; a visualization component renders its output.
  This keeps simulations unit-testable without a DOM and reusable across
  different visual treatments.
- **Build only what's real.** Directories for future domains (lessons,
  quizzes, playgrounds, progress, visualizations) exist now as typed
  contracts so the architecture is settled, but they hold no fabricated
  content or half-built UI — each fills in when its phase is actually built.
- **Dark-only design.** One palette (`#050507` background, `#F5F5F7`
  foreground, with violet/blue/cyan marking the AI/ML/DL tracks), no
  light-mode toggle, defined as Tailwind v4 theme tokens in
  `src/app/globals.css`.
- **Accessibility and reduced motion are load-bearing, not polish.** See
  `src/hooks/useReducedMotion`.

## Local setup

Requires Node.js 20.9+ (developed against Node 22).

```bash
npm install
cp .env.example .env.local # optional — the app runs with no env vars set
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Development commands

| Command                | Purpose                           |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack)  |
| `npm run build`        | Production build                  |
| `npm run start`        | Serve a production build          |
| `npm run lint`         | ESLint                            |
| `npm run typecheck`    | `tsc --noEmit`                    |
| `npm run format`       | Prettier, writes changes          |
| `npm run format:check` | Prettier, check only (used in CI) |

## Testing commands

| Command              | Purpose                                         |
| -------------------- | ----------------------------------------------- |
| `npm run test`       | Unit/component tests (Vitest + Testing Library) |
| `npm run test:watch` | Same, in watch mode                             |
| `npm run test:e2e`   | End-to-end tests (Playwright)                   |

Unit/component tests are colocated with their source as `*.test.ts(x)`.
End-to-end tests live in `e2e/`. CI (`.github/workflows/ci.yml`) runs
format-check, lint, typecheck, unit tests, and build on every push and PR;
Playwright is not yet wired into CI (see that file for why).

## Folder responsibilities

Everything app-specific lives under `src/`.

| Path                         | Responsibility                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `app/`                       | Next.js App Router routes only — thin pages that compose domain modules below.  |
| `components/ui/`             | Generic, content-agnostic UI primitives (e.g. `Spinner`).                       |
| `components/layout/`         | Structural layout primitives (e.g. `Container`).                                |
| `content/`                   | Authored MDX lesson content. Empty until real lessons exist.                    |
| `curriculum/metadata/`       | The concept schema (Zod) — id, track, prerequisites, status, etc.               |
| `curriculum/graph/`          | Pure functions over curriculum data: traversal, cycle detection, auditing.      |
| `lessons/`                   | The lesson-engine's contracts (stage pipeline types). No renderer yet.          |
| `visualizations/primitives/` | Low-level visualization building blocks. Empty until D3/React Flow are adopted. |
| `visualizations/components/` | Concrete visualizations (knowledge graph, network diagrams). Empty for now.     |
| `simulations/`               | Pure simulation logic contracts. No math implementations yet.                   |
| `quizzes/`                   | Quiz data contracts. No quiz UI yet.                                            |
| `playgrounds/`               | Interactive playground contracts. No playground UI yet.                         |
| `progress/`                  | Progress-tracking contracts, storage-agnostic (Supabase lands later).           |
| `hooks/`                     | Shared React hooks (e.g. `useReducedMotion`).                                   |
| `lib/`                       | Framework-agnostic utilities (e.g. `cn`).                                       |
| `types/`                     | Cross-cutting types shared across domains. Empty until something needs it.      |
| `config/`                    | App-wide configuration (site name, description, URL).                           |
| `test/`                      | Shared test setup (Vitest).                                                     |

## Contribution conventions

- One concern per top-level `src/` folder (see above) — don't reach into
  another domain's internals; import its public surface (`index.ts`).
- Colocate unit/component tests next to the file they test:
  `Thing.ts` + `Thing.test.ts`.
- Simulation logic (`src/simulations`) must stay framework-free — no React
  imports, no DOM access.
- Curriculum data changes go through the Zod schema in
  `src/curriculum/metadata` — don't hand-write objects that bypass
  validation.
- Don't add a dependency (or an external service) unless the task at hand
  needs it. Prefer a well-maintained library over a custom reimplementation
  of a solved problem.
- Before opening a PR, run the same checks as CI:

  ```bash
  npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build
  ```
