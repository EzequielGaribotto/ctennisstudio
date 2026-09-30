# CTennis Studio website — working with Pablo

This is **ctenisstudio.com**, the website of Pablo Garibotto (professional tennis stringer): his services
(stringing, racquet balancing SET/MATCH/POINT, courses) and his "Experience Tour" of ATP/WTA tournaments.

## Who you are talking to

The person prompting is usually **Pablo**, the site owner. He is **not technical**: he doesn't know git,
npm, terminals, code or file formats. His son Ezequiel (GitHub `EzequielGaribotto`) built the site and may
also work here; if the person writes technically, adapt.

With Pablo:
- **Language:** Spanish, a natural mix of Rioplatense and Spain Spanish (vos/tenés is fine, "ordenador" or
  "computadora" both fine). Warm, short, clear.
- **Explain what you're doing in plain words** before and while you do it ("Estoy achicando las fotos para
  que la página cargue rápido"). Never paste stack traces or code at him; translate errors into what they mean
  and what you'll do about it.
- **Ask questions without jargon**, and prefer multiple-choice (AskUserQuestion) with a recommended option.
  E.g. not "¿Hago rebase?" but "Tu hijo cambió algo mientras tanto, ¿junto sus cambios con los tuyos? (recomendado)".
- Still apply real engineering best practices; just explain them simply when they matter to him.
- Remind him, when useful, that he can use **auto mode** so he doesn't have to approve every step.

## Start of every session

1. Make sure you're in the project folder (see "Where the project lives" below).
2. `git status` + `git pull --rebase origin main` so he works on the latest version. If he has unpublished
   changes, tell him plainly ("Tenés cambios sin publicar de la otra vez: …").
3. If `node_modules` is missing or `package.json` changed, run `npm ci`.
4. Run `npm run fotos -- recordatorio`. If it lists recent tournaments without photos (or photos waiting in
   `fotos-nuevas`), mention it **once**, in one friendly line, and move on to what he asked
   ("Por cierto: todavía faltan fotos del Mutua 2026 y Ginebra 2026, cuando las tengas pasámelas 😉").

## Pablo's commands (plain phrases → what to do)

| He says something like | Do this |
|---|---|
| "probar", "test", "quiero verlo", "abrí la página", "verlo en el celular" | Skill **probar**: run the site locally, open it in Chrome (Chrome DevTools MCP), optionally on his phone |
| "publicar", "subir", "prod", "subir los cambios", "ponelo online", "que se vea en la web" | Skill **publicar**: pre-production checklist → checks → confirm → commit → push to `main` → confirm it's live |
| anything about photos, "¿qué fotos faltan?", "no tengo foto de…", "te pasé fotos" | Skill **fotos** |
| "deshacer", "volvé atrás", "lo de antes estaba mejor" (after publishing) | `git revert` the relevant commit(s), explain, then run the **publicar** flow. Never rewrite history |
| "¿qué cambió?", "historial", "¿qué hicimos la otra vez?" | `npm run historial` and retell it in plain Spanish (who, when, what the visitor sees; published or not) |
| "ayuda", "¿qué puedo hacer?" | Short list of what he can ask for (photos, tournaments, texts, design changes, probar, publicar) |

Never publish (commit/push) unless he asked to publish **and** confirmed the summary.

## Where the project lives

- Repo: https://github.com/EzequielGaribotto/ctennisstudio (public). Pablo pushes as GitHub user `pablogaris`
  (collaborator). Pushing to `main` deploys to production automatically on **Vercel** (1–2 min). There is no
  other deploy step; old GitHub Pages files were removed.
- On Pablo's PC the setup script records the folder in `~/.claude/CLAUDE.md`. If the folder is missing, follow
  [docs/INSTALACION.md](docs/INSTALACION.md).

## Project map

- Next.js 15 (App Router) + React 19 + TypeScript, CSS Modules + Tailwind 4. Node ≥ 20.
- Home sections: [src/components/section/tennis/](src/components/section/tennis/) (Hero, Encordado,
  Equilibrado, Cursos, Experiencia = tournaments). Header/Footer in [src/components/](src/components/).
- **All texts** (Spanish + English) live in [src/app/translations/es.ts](src/app/translations/es.ts) and
  [en.ts](src/app/translations/en.ts); new keys must also be added to `baseTranslations.ts`. When Pablo changes a
  text, update **both** languages (translate it yourself and tell him).
- **Contact data / social links**: [src/data/contact.ts](src/data/contact.ts) (single source of truth).
- **Tournaments** (cards): [src/data/tournaments.json](src/data/tournaments.json). Fields: `id`, `city`,
  `countryCode` (ISO, for the flag), `category` (display name), `years` (newest first), `tournamentCode`
  (UPPERCASE, letters/digits/_ — the photo filename prefix), `places`, optional logos (`unifiedLogo`,
  `mensLogo`/`womensLogo` category stamps in `public/images/stringer/tournament_logos/category_stamps/`),
  `level` (`ATP_WTA_1000` | `ATP_500` | `ATP_250` | `CHALLENGER` | `ATP_WTA_125` | `UNCLASSIFIED`, controls order).
- **Tournament photos**: `public/images/stringer/tournaments/"<CODE> <PLACE> <YEAR> <N>.webp"`, listed in the
  generated `src/data/tournament-images.json` (never edit by hand). Years he has no photos for:
  `src/data/photo-status.json`.
- Contact form → [src/app/api/contact/route.ts](src/app/api/contact/route.ts) sends email via Resend
  (`RESEND_API_KEY` is set in Vercel; locally the form can't send, that's expected).

## Tools (use these, don't reinvent)

- `npm run fotos` — photo status (missing years, pending inbox). Subcommands: `revisar`, `agregar`,
  `descartar`, `recuperar`, `manifiesto`, `optimizar`, `verificar`. See [scripts/fotos.mjs](scripts/fotos.mjs).
- `npm run imagen -- <origen> <destino.webp> [--quitar-fondo] [--max N]` — any other image (logos, portraits,
  service photos). Always converts to optimized WebP without metadata (no GPS location).
- `npm run favicons [-- logo --margen 10]` — regenerates browser/phone icons from the logo.
- `npm run build` — full check (lint + photo verification + type check + production build). Must pass
  before publishing.
- `npm run dev` — local site at http://localhost:3000. `npm run celular` — QR code to open it on his phone (same Wi-Fi).
- `npm run historial [-- N]` — last changes, who made them, published or not.
- **Chrome DevTools MCP** (`chrome-devtools`, configured in `.mcp.json`): use it to open the local site for Pablo, take
  screenshots (desktop + phone via `emulate`/`resize_page`), and read console errors. Prefer it over asking him to
  describe what he sees.

Pablo drops new files in **`fotos-nuevas/`** (ignored by git; originals are kept in `fotos-nuevas/_procesadas/`).

## Rules

- Keep changes focused on what he asked. Big redesigns: describe the plan in plain words and confirm first.
- Every image that goes on the site passes through `npm run fotos`/`npm run imagen` (WebP, ≤1600px, no metadata).
  Never commit raw phone photos, HEIC, or anything from `fotos-nuevas/`.
- Filenames are case-sensitive in production (Vercel = Linux).
- Never commit secrets (`.env*`), never `git push --force`, never `git reset --hard` on published work,
  never skip hooks/checks.
- **Bugs are always fixed** when you find them (see the publicar checklist); taste/design changes are proposed first.
- Text on orange (`--primary`) backgrounds uses `var(--on-primary)` (dark), never white (unreadable).
- Match the existing code style (see surrounding files). Keep colors on the CSS variables in
  [src/app/globals.css](src/app/globals.css) (`--primary` orange, dark background, white cards).
