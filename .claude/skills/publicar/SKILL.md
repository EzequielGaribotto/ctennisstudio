---
name: publicar
description: Publish the website changes to production (ctenisstudio.com). Use when Pablo says "publicar", "subir", "subir los cambios", "prod", "producción", "ponelo online", "que se vea en la web", "deploy", or similar. Runs a pre-production review, the automatic checks, asks for confirmation, then commits and pushes to main (Vercel deploys automatically).
---

# Publicar (llevar los cambios a la web real)

Talk to Pablo in plain Spanish at every step (see CLAUDE.md). Nothing reaches production until step 5.
**Security and quality results are always explained to Pablo in everyday words** — what is protected or what was
wrong, never jargon (use the table in CLAUDE.md → "Talking about security with Pablo"). Technical detail goes to Ezequiel.

## 1. What's changing

- `git status` and `git diff --stat` (plus `git log origin/main..HEAD` for unpushed commits).
- If there's nothing to publish, tell him and stop.
- Make a short **plain-language list** of the changes ("Agregué 3 fotos del Mutua 2026", "Cambié el texto de
  Cursos"). Include any files you don't recognize as his work and ask about them rather than publishing blindly.
- Never include `fotos-nuevas/`, `.env*`, `.vercel/`, or large raw images (anything in `public/` that isn't
  optimized WebP, except the video and icons).

## 2. Pre-production review (do it yourself, silently fix small things)

Review the diff (and files it touches) for:

- **Security** (all of "Security rules" in CLAUDE.md): no secrets/keys, no injection sinks
  (`dangerouslySetInnerHTML`, `innerHTML`, `eval`), external links with `rel="noopener noreferrer"`,
  `window.open(..., "noopener,noreferrer")`, input validated and escaped in API routes, outside-key lookups via `own()`,
  no new third-party scripts/embeds/dependencies without a reason and Ezequiel/Pablo agreeing, CSP untouched.
- **Duplication / maintainability**: reuse `src/data/contact.ts`, translations, `tournaments.json`; no copy-pasted
  components; no leftover debug `console.log`, commented-out code or unused imports/files.
- **Performance**: images via the scripts (WebP ≤1600px, few hundred KB), no new eager/priority images below the
  fold, no big new dependencies without reason.
- **Design cohesion**: text readable on its background (contrast ≥ 4.5:1 — e.g. never white on the orange, use
  `var(--on-primary)`), buttons consistent with the existing ones (orange `--primary`, dark text), both languages
  updated, layout OK on phone widths, keyboard focus visible, images with `alt`.
- **Accessibility / correctness**: interactive elements are buttons/links (or have `role`, `tabIndex`, key
  handlers), no duplicate `id`s, no hydration mismatches (don't read `window`/`localStorage` during render).

What to do with findings:
- **Bugs** (anything broken, wrong, unreadable, insecure, missing translation, console errors, broken links/images,
  layout overflow on mobile…): **always fix them** before publishing, even if they weren't part of today's change,
  as long as the fix keeps the intended behavior. Tell Pablo in one line what you fixed ("De paso arreglé un botón
  que no se leía bien").
- **Cleanups** (duplication, dead code, small performance wins): fix when safe and small.
- **Design/behavior changes that are a matter of taste or big**: don't do them silently — explain simply and ask.

### Visual and quality check (Chrome DevTools MCP) — this is a gate

Do this on a **production build** (it's what visitors get, and the CSP only applies there):
`npm run build`, then `npx next start -p 3100` in the background.

1. Open the pages touched by the change (at least `/`, plus `/contact/` or `/services/set/` if relevant) with
   `navigate_page`, then `take_screenshot` on desktop and phone (`emulate` viewport `390x844x2,mobile,touch`) and
   `list_console_messages` (types error/issue/warn): **no errors and no Content-Security-Policy violations**.
2. **Lighthouse gate** — `lighthouse_audit` (mode `navigation`, device `mobile`) on `/`, `/contact/` and `/services/set/`
   (and `desktop` on `/` if the layout changed). Required: **Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95**
   and no failed audit in "agentic-browsing". The site currently scores **100/100/100/100** everywhere, so any drop
   is something the change introduced. If you changed a popup or the tournament gallery, open it
   (click via `evaluate_script`) and run the audit in `snapshot` mode too.
3. Every failed audit is a bug → fix it (typical: low contrast → `--primary-text` for orange text on light backgrounds,
   `--on-primary` for text on orange; missing `alt`/labels; images without real `width`/`height`; missing `<main>`).
   Re-run until it passes. If you can't fix it, **don't publish** and explain simply.
4. Stop the background server when done. If the MCP isn't available at all, say so, still run the automatic checks
   below, and tell Ezequiel the visual/quality gate was skipped.

## 3. Automatic checks

```
npm run build
npm run seguridad
```

`build` = lint (including security rules) + photo/logo verification + type check + production build.
`seguridad` = vulnerable libraries, leaked keys, risky code, protections still in place, pinned tools.
If either fails: fix the cause (e.g. `npm audit fix` for libraries), re-run; if you can't, explain in plain words
and **don't publish**. Nothing is pushed while checks fail. A "⚠️" warning doesn't block, but mention it to
Ezequiel (e.g. the contact form's anti-spam check still not active).

## 4. Confirm with Pablo

Show the plain-language summary + "todo verificado ✅ (la web, su seguridad y su calidad)" and ask (AskUserQuestion) something like
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
- Then check `https://ctenisstudio.com` answers 200 (and, if practical, that the new content/photo URL is there)
  and run `npm run seguridad -- --live` (protections active on the real site). A ❌ here is urgent: fix and republish
  (or revert) right away and tell Ezequiel.
- Tell him: "¡Listo! Ya está en la web. Si no ves el cambio, apretá Ctrl+F5 para recargar."
- If Vercel fails: the previous version stays online (nothing breaks for visitors). Explain that, find the cause,
  fix and publish again. If the status description says the deployment was **blocked / needs authorization**
  (Vercel didn't accept a commit from `pablogaris`), that's an account setting, not his fault: tell him to let
  Ezequiel know, and don't retry in a loop.
- Optionally open https://ctenisstudio.com with the Chrome DevTools MCP and screenshot the changed section.
