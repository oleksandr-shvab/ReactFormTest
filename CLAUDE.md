# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

`my-form-practice/` is the only package in this repo — the Vite + React + TypeScript app. All source code (`src/`), HTML entrypoint, ESLint config, TS config, and `package.json`/`node_modules` live there. **Run all dev/build/lint commands from inside this directory.** The repo root only holds `CLAUDE.md`, `.gitignore`, and `.git` — no separate root-level package.

Git is initialized at the repo root (default branch `main`).

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

`App.tsx` is still the unmodified Vite `react-ts` template scaffold (renders the default starter page with a counter button) — no form, validation, or data-fetching UI has been built yet. `react-hook-form`, `zod`, `@hookform/resolvers`, and `@tanstack/react-query` are installed as dependencies, staged for a practice signup form. Key structural points:

- Entry point is `src/main.tsx`, which mounts `<App />` from `src/App.tsx` into `#root` (defined in `index.html`) inside `StrictMode`, wrapped in a `QueryClientProvider` (one `QueryClient` instance created at module scope — this is the only react-query plumbing in place so far).
- `tsconfig.json` is a solution file referencing `tsconfig.app.json` (app source, `src/`) and `tsconfig.node.json` (Vite config itself) as separate TypeScript project references — keep this split in mind when adjusting compiler options.
- TS config uses strict bundler-mode settings: `verbatimModuleSyntax`, `moduleResolution: "bundler"`, `noUnusedLocals`/`noUnusedParameters`, and `noEmit` (type-checking only; Vite/esbuild handles actual transpilation).
- Static assets referenced via absolute `/`-prefixed paths (e.g. `/icons.svg`, `/favicon.svg`) live in `my-form-practice/public/`; assets imported directly in code (e.g. `hero.png`, `react.svg`) live in `my-form-practice/src/assets/`.
- ESLint (`eslint.config.js`) uses the flat-config format with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`; `dist/` is globally ignored.
