# scripts/

Node-only CLI scripts. Run via `tsx` — no bundler, no React imports, no DOM.

## Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `build-registry.ts` | `pnpm build:registry` | Scan `src/lib/lessons/{subject}/{topic}/*.ts` and write `src/lib/lessons/data.generated.ts`. Runs on `predev` + `prebuild`; output is committed. |
| `validate-content.ts` | `pnpm validate:content` | Run Zod `chapterSchema` over every chapter, cross-check against topic trees. Runs on `prebuild`. Fails the build on any violation. |
| `new-chapter.ts` | `pnpm new-chapter <subject>/<topic>/<chapter> [title]` | Scaffold a chapter file. Computes next `order` automatically. |
| `new-topic.ts` | `pnpm new-topic <subject>/<category>/<topic> [name]` | Insert a `TopicNode` into the tree file + scaffold an `intro.ts` chapter. |

## Rules

- **Node-only** — plain `.ts`, no JSX, no React. Use `import { foo } from "node:fs/promises"` and friends.
- **`@/` alias works via tsx** — import `@/lib/lessons/schema` etc., not relative `../src/...` from script code (the scaffolder's dynamic `import()` calls are the exception).
- **Fail loudly** — on any error, print a clear message and `process.exit(1)`. Never swallow.
- **Deterministic output** — sort entries before emitting (see `build-registry.ts` `entries.sort(...)`). Never embed timestamps or random IDs in generated files.
- **Export the core function** — keep logic in an exported function (e.g. `buildRegistry`, `createChapter`) and guard the CLI entry with an `if (import.meta.url === ...)` check. Enables direct unit testing.
- **Tests live alongside** as `*.test.ts` — run with `pnpm test`.
