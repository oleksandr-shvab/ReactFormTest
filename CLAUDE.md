# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo has two separate `package.json`/`node_modules` trees, which is important to get right before running any command:

- **`my-form-practice/`** — the actual Vite + React + TypeScript app. All source code (`src/`), HTML entrypoint, ESLint config, and TS config live here. **Run all dev/build/lint commands from inside this directory.**
- **repo root** (`/`) — only holds `package.json`/`package-lock.json` declaring `react-hook-form`, `zod`, `@hookform/resolvers`, and `@tanstack/react-query`. These packages are installed into the root `node_modules/` but are **not** listed as dependencies of `my-form-practice/package.json` and are not yet used by any code in `src/`. This looks like form/validation/data-fetching tooling staged for the practice app but not yet wired in — if you add code that imports these packages inside `my-form-practice/src`, you'll need to add them to `my-form-practice/package.json` and install there too (or otherwise reconcile the two dependency trees).

There is no git repository initialized yet.

## Commands

All commands below run from `my-form-practice/`:

```bash
npm run dev       # start Vite dev server with HMR
npm run build     # type-check via `tsc -b` then production build via `vite build`
npm run lint      # run ESLint over the project
npm run preview   # preview the production build locally
```

There is no test runner configured in this project.

## Architecture

The app is currently the unmodified Vite `react-ts` template scaffold (`my-form-practice/src/App.tsx` renders the default Vite/React starter page with a counter button) — no form, validation, or data-fetching logic has been built yet. Key structural points for when that work begins:

- Entry point is `src/main.tsx`, which mounts `<App />` from `src/App.tsx` into `#root` (defined in `index.html`) inside `StrictMode`.
- `tsconfig.json` is a solution file referencing `tsconfig.app.json` (app source, `src/`) and `tsconfig.node.json` (Vite config itself) as separate TypeScript project references — keep this split in mind when adjusting compiler options.
- TS config uses strict bundler-mode settings: `verbatimModuleSyntax`, `moduleResolution: "bundler"`, `noUnusedLocals`/`noUnusedParameters`, and `noEmit` (type-checking only; Vite/esbuild handles actual transpilation).
- Static assets referenced via absolute `/`-prefixed paths (e.g. `/icons.svg`, `/favicon.svg`) live in `my-form-practice/public/`; assets imported directly in code (e.g. `hero.png`, `react.svg`) live in `my-form-practice/src/assets/`.
- ESLint (`eslint.config.js`) uses the flat-config format with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`; `dist/` is globally ignored.
