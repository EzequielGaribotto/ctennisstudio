---
name: publicar
description: Publish the website changes to production (ctenisstudio.com). Use when Pablo says "publicar", "subir", "subir los cambios", "prod", "producción", "ponelo online", "que se vea en la web", "deploy", or similar. Runs a pre-production review, the automatic checks, asks for confirmation, then commits and pushes to main (Vercel deploys automatically).
---

# Publicar (llevar los cambios a la web real)

Talk to Pablo in plain Spanish at every step (see CLAUDE.md). Nothing reaches production until step 5.

## 1. What's changing

- `git status` and `git diff --stat` (plus `git log origin/main..HEAD` for unpushed commits).
- If there's nothing to publish, tell him and stop.
- Make a short **plain-language list** of the changes ("Agregué 3 fotos del Mutua 2026", "Cambié el texto de
  Cursos"). Include any files you don't recognize as his work and ask about them rather than publishing blindly.
- Never include `fotos-nuevas/`, `.env*`, `.vercel/`, or large raw images (anything in `public/` that isn't
  optimized WebP, except the video and icons).

## 2. Pre-production review (do it yourself, silently fix small things)

Review the diff (and files it touches) for:

- **Security**: no secrets/keys, no `dangerouslySetInnerHTML` with user data, external links with
  `rel="noopener noreferrer"`, `window.open(..., "noopener,noreferrer")`, input validated in API routes.
- **Duplication / maintainability**: reuse `src/data/contact.ts`, translations, `tournaments.json`; no copy-pasted
  components; no leftover debug `console.log`, commented-out code or unused imports/files.
- **Performance**: images via the scripts (WebP ≤1600px, few hundred KB), no new eager/priority images below the
  fold, no big new dependencies without reason.
- **Design cohesion (minimal)**: text readable on its background (e.g. no white text on white), buttons
  consistent with the existing ones (orange `--primary`), both languages updated, layout OK on mobile widths.

Fix only small, safe issues that **don't change how the site behaves**. If something bigger is off, explain it
simply and ask whether to fix it now or later.

## 3. Automatic checks

```
npm run build
```

(lint + photo/logo verification + type check + production build). If it fails: fix it, re-run; if you can't,
explain in plain words and **don't publish**. Nothing is pushed while checks fail.

## 4. Confirm with Pablo

Show the plain-language summary + "todo verificado ✅" and ask (AskUserQuestion) something like
"¿Lo publico en la web?" — options: "Sí, publicar" / "Primero quiero probarlo" (→ run the **probar** skill) /
"No, todavía no".

## 5. Commit and push

- Stage explicit paths (not `git add -A` blindly). Commit message: clear English or Spanish summary of what
  changed for the visitor (e.g. `Add Mutua Madrid 2026 photos`), one logical commit per publish is fine.
- `git pull --rebase origin main` first. If there's a conflict: stop, `git rebase --abort`, explain ("Ezequiel
  cambió lo mismo mientras tanto") and resolve carefully (or ask). Never `--force`.
- `git push origin main`. If Windows asks him to sign in to GitHub, tell him to log in as **pablogaris** in the
  window that opened.

## 6. Confirm it's live

- Vercel builds automatically (1–2 min). Check the commit status:
  `curl -s https://api.github.com/repos/EzequielGaribotto/ctennisstudio/commits/<sha>/status` (state
  `success`/`pending`/`failure`), polling every ~30s for up to ~5 min.
- Then check `https://ctenisstudio.com` answers 200 (and, if practical, that the new content/photo URL is there).
- Tell him: "¡Listo! Ya está en la web. Si no ves el cambio, apretá Ctrl+F5 para recargar."
- If Vercel fails: the previous version stays online (nothing breaks for visitors). Explain that, find the cause,
  fix and publish again.
