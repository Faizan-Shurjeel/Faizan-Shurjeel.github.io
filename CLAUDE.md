# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Muhammad Faizan Shurjeel, deployed as a static site on GitHub Pages at `https://faizan-shurjeel.github.io/`.

The repository is mid-migration. There are three generations of the site here:

| Directory | Stack | Status |
|---|---|---|
| `site/` | Vite 8 + React 19 + TypeScript + GSAP | **Current source of truth.** Not yet deployed. |
| `my-app/` | Next.js 15 + Tailwind v4 | Legacy. Its build output is what is live today. |
| `OLD/` | Hand-written HTML/CSS | Archived, inert. |

The files committed at the repository root (`index.html`, `_next/`, `404.html`, `index.txt`, `*.svg`) are the **Next.js static export** — that is what GitHub Pages currently serves. Nothing from `site/` has been copied to the root yet.

## Current site (`site/`)

**Package manager:** `bun`.

```bash
cd site
bun install
bun dev        # Vite dev server, http://localhost:5173
bun run build  # tsc -b && vite build → site/dist
bun run preview
bun run lint   # oxlint
```

### Architecture

- **`src/App.tsx`** — the whole page. Header, hero, projects, about, footer. No router; it is one document with anchor navigation.
- **`src/data/projects.ts`** — the six featured projects as data. Editing content means editing this file, not the JSX.
- **`src/useSiteAnimations.ts`** — every GSAP timeline and ScrollTrigger on the site, in one hook.
- **`src/index.css`** — design tokens plus all styles. Semantic class names, no utility classes.
- **`src/main.tsx`** — entry point; adds the `js-anim` class to `<html>` before render.

### The `js-anim` progressive-enhancement guard

This is the one non-obvious mechanism in the codebase and it is easy to break.

`html.js-anim .reveal { opacity: 0 }` in CSS hides scroll-reveal elements — but only once `main.tsx` has added that class, which requires JS. With JS disabled the class is never added and all content stays visible. That is the intended no-JS fallback.

`useSiteAnimations` then does two things **in the same synchronous pass**:

```ts
gsap.set(".reveal", { opacity: 0, y: 26 });  // hidden state → inline styles GSAP owns
root.classList.remove("js-anim");            // class is now irrelevant
```

Order matters. If the class is removed before the inline styles are set, every below-fold element flashes visible at once. If the class is removed later (e.g. in a timeline `onComplete`), a stalled or errored timeline strands the whole page at `opacity: 0` permanently. Both bugs have already happened here — do not reintroduce them by moving the `classList.remove` call.

Under `prefers-reduced-motion: reduce` the hook sets `.reveal` to visible, drops the class, and returns before creating any timeline.

### Build config

`vite.config.ts` splits vendors into `gsap` and `react` chunks so a change to one does not invalidate the other's cache. Vite 8 uses **Rolldown**, which only accepts the *function* form of `manualChunks` — the object form fails typecheck with TS2769.

`base` stays `"/"`. This is a GitHub Pages *user* site, not a project site, so there is no basePath.

## Deployment

**Target:** GitHub Pages user site, served from the `main` branch root. There is no Actions workflow; deployment is a manual copy of build output into the repository root.

```bash
cd site
bun run build
cp -r dist/. ..     # dist contents → repo root (includes .nojekyll)
cd ..
git add -A
git commit -m "Deploy: <description>"
git push origin main
```

`.nojekyll` lives in `site/public/`, so every build carries it into `dist`. Without it GitHub Pages' Jekyll pass ignores underscore-prefixed directories and asset loading breaks.

**Stale-artifact caveat:** copying `dist/` over the root does *not* remove the Next.js export already committed there (`_next/`, `404.html`, `index.txt`, `file.svg`, `globe.svg`, `window.svg`, `vercel.svg`). Those files keep being served as dead weight until they are explicitly deleted. A first deploy from `site/` should remove them in the same commit — check with `git status` before committing, and confirm with the user before deleting anything currently live.

## Content

Projects are featured from the user's GitHub: Verascope (lead), focus_client_rust, FYP, R-vision, AuraTrack, LensAR-Arcade. Copy is drafted from each repo's README and source.

Two deliberate content decisions:
- **No phone number.** The old Next.js site hardcoded it in the hero and footer. Public numbers get scraped. Contact is email + LinkedIn only.
- **R-vision is framed as authorized scanning of the user's own lab subnet**, not as an unqualified "vulnerability scanner".

## Available Tools

System has: `bun`, `rtk` (Rust Token Killer CLI proxy), `gh` (GitHub CLI), `git`, `node v24.15.0`, `npm`.

**RTK Usage:** For token-optimized operations, `rtk` automatically proxies commands. See `@RTK.md` in the user's global config.

## Troubleshooting

**Page renders blank or content stuck invisible** — the `js-anim` class is still on `<html>`. Check that `useSiteAnimations` removes it synchronously; see the section above.

**Everything fades in at once instead of on scroll** — the inline `gsap.set` on `.reveal` is running after the class removal, or `ScrollTrigger.batch` is not matching. Confirm `.reveal` elements exist in `App.tsx`.

**TS2769 on `manualChunks`** — use the function form, not the object form. Rolldown, not Rollup.

**Assets 404 on GitHub Pages** — confirm `.nojekyll` reached the repo root, and that `base` is `"/"`.

**Verifying animations headlessly is unreliable** — headless Chrome throttles GSAP's rAF ticker, so `--virtual-time-budget` does not advance animation time proportionally. Static checks (do the selectors resolve? is the class cleared?) are trustworthy; measured mid-animation opacity values are not. Confirm motion in a real browser.

## Legacy (`my-app/`)

Next.js 15 static export (`output: "export"`, `images.unoptimized: true`). All content in `app/page.tsx`, all styles in `app/globals.css`, built with `bun run build` into `my-app/out`, then copied to the repo root. Retained only until `site/` is deployed; do not add features here.
