# Little Playroom

A calm, colorful mobile playroom for children ages 4 to 8, with simple creative games designed for touch.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm github:sync` — sync committed local `main` history to GitHub using the managed connection
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/little-playroom/app/index.tsx` — home screen and game launcher
- `artifacts/little-playroom/app/paint.tsx` — persistent finger-painting studio
- `artifacts/little-playroom/app/piano.tsx` — landscape piano with guided Twinkle mode
- `artifacts/little-playroom/app/memory.tsx` — memory matching game
- `artifacts/little-playroom/constants/colors.ts` — app palette and semantic color tokens

## Architecture decisions

- The first build is frontend-only and keeps the child's play state on-device with AsyncStorage.
- Games use focused full-screen routes with minimal navigation chrome and large touch targets.
- The piano locks to landscape while open and returns to portrait when leaving.
- Drawing is rendered as SVG strokes from PanResponder touch points for a smooth, native-friendly canvas.

## Product

- Home screen with three games: Color Studio, Little Piano, and Find the Pairs.
- Color Studio includes favorite colors, an expanded color grid, marker/pen tools, stroke sizes, clear, and saved drawings.
- Little Piano includes large touch keys and a guided Twinkle, Twinkle mode.
- Find the Pairs includes six matching pairs, move counting, match feedback, and replay.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `pnpm github:sync` is the credential-safe GitHub backup path. It uses Replit's managed GitHub OAuth connection through the API, never a personal access token.
- The sync refuses to run from a non-`main` branch or dirty worktree, refuses to overwrite a divergent GitHub `main`, and only performs a non-force update after validating the local commit and tree SHAs.
- A successful run reports either that GitHub is already up to date or how many commits were pushed. A failed run can leave unreferenced GitHub objects, but it never advances the branch to an unexpected history.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
