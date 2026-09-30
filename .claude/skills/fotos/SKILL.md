---
name: fotos
description: Manage the website's photos with Pablo — tournament photos (Experience Tour), missing photos, photos he doesn't have, new tournament logos, and any other image (portraits, services). Use when he mentions fotos, imágenes, "¿qué fotos faltan?", "te pasé fotos", "no tengo foto de…", logos, or adding a tournament.
---

# Fotos

All image work goes through the project scripts (they convert to WebP, shrink to ≤1600px, strip GPS/EXIF, name
files correctly and refresh the photo list). Talk in plain Spanish.

## "¿Qué fotos faltan?" / status

Run `npm run fotos`. Turn the output into a friendly list grouped by tournament, e.g.
"**Mutua Madrid**: falta 2026 · **Challenger**: faltan 2026, 2024, 2021, 2020 …". Mention years marked
"no tengo foto" only if he asks. If something looks off (photos for a year not shown on the card, badly named
files) explain and offer to fix.

## Where he puts photos

Folder **`fotos-nuevas`** inside the project. Open it for him: `explorer fotos-nuevas` (create it if missing).
Tell him: "Arrastrá ahí las fotos (del celular, WhatsApp, email… cualquier formato). Avisame cuando estén."
Tips for him when relevant: send photos to himself by WhatsApp/email if they're on the phone; iPhone HEIC
photos are converted automatically on Windows, if one fails, open it with the Photos app → "Guardar como" JPG.

## Adding tournament photos

1. `npm run fotos -- revisar` (lists pending files with the date they were taken) and **look at each photo**
   (Read the image) to recognize tournament/venue/year when possible.
2. Propose the assignment and confirm in one question, e.g. "Estas 3 parecen del Mutua Madrid 2026 (fecha de
   la foto: mayo 2026). ¿Correcto?". For multi-venue tournaments (Challenger, WTA 125, RFET) ask the venue.
3. For each photo:
   `npm run fotos -- agregar "<archivo>" --torneo <CODE> --lugar "<Lugar>" --anio <YYYY>`
   (CODE from `src/data/tournaments.json`; use one of the tournament's `places`). The script names the file,
   adds the year to the card if missing, moves the original to `fotos-nuevas/_procesadas/` and refreshes the list.
4. Order matters: the first photo (`… 0.webp`) of the newest year is the card's cover. If he wants a different
   cover or order, rename indexes (keep the format) and run `npm run fotos -- manifiesto`.
5. Offer **probar** so he sees them, then **publicar**.

## "No tengo fotos de …" (discard)

`npm run fotos -- descartar <CODE> <YYYY> --motivo "<why, in his words>"` → it stops being listed as missing.
The year stays on the card (he did work there). If he wants the year removed from the card too, edit
`years` in `tournaments.json`. Undo with `npm run fotos -- recuperar <CODE> <YYYY>`.

## New tournament

Ask (plainly): name, city/venues, country, years, category (Masters 1000, 500, 250, Challenger, WTA 125, ITF,
other). Add an entry to `src/data/tournaments.json` following the existing ones (UPPERCASE `tournamentCode`,
no spaces). Logo: have him drop it in `fotos-nuevas`, then
`npm run imagen -- "fotos-nuevas/<logo>" public/images/stringer/tournament_logos/<name>_logo.webp --max 800`
(add `--quitar-fondo` if it has a white background; look at the result). Category stamps already exist in
`tournament_logos/category_stamps/`. Then add photos as above, or mark years as "no tengo foto".

## Other images (portraits, services, banners)

`npm run imagen -- "<origen>" public/images/stringer/<carpeta>/<nombre>.webp` then update the component that
uses it (grep for the old path). Replacing an image: keep the same filename when possible.

## Site icon (favicon)

`npm run favicons -- "<logo>"` (add `--margen 10` if the logo touches the edges). Browsers cache icons; tell
him it can take a while to show.

## Nice extra

If he doesn't know which photos he's missing, generate the status and offer a simple checklist he can keep
(e.g. write it in chat or as a note) so he can look for them on his phone/computer.
