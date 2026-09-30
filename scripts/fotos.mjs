#!/usr/bin/env node
// Tournament photo manager.
//
//   npm run fotos                      -> status: what's missing, what's waiting in fotos-nuevas/
//   npm run fotos -- revisar           -> list photos waiting in fotos-nuevas/ with the date they were taken
//   npm run fotos -- agregar <archivo> --torneo MUTUA --lugar Madrid --anio 2026
//   npm run fotos -- descartar MUTUA 2010 [--motivo "no hay fotos"]
//   npm run fotos -- recuperar MUTUA 2010
//   npm run fotos -- manifiesto        -> rebuild src/data/tournament-images.json
//   npm run fotos -- optimizar         -> shrink oversized photos already on the site
//   npm run fotos -- verificar         -> fail if any referenced image is missing/misnamed
//
// Photo filename format (the site depends on it): "<CODE> <PLACE> <YEAR> <N>.webp"
//   e.g. "MUTUA MADRID 2025 0.webp", "WTA125 LA BISBAL 2025 1.webp"
import fs from "fs"
import path from "path"
import { ROOT, INPUT_EXTENSIONS, toWebp, kb, normalizePlace, loadSharp } from "./lib/images.mjs"

const TOURNAMENTS_DIR = path.join(ROOT, "public", "images", "stringer", "tournaments")
const TOURNAMENTS_URL = "/images/stringer/tournaments"
const INBOX_DIR = path.join(ROOT, "fotos-nuevas")
const PROCESSED_DIR = path.join(INBOX_DIR, "_procesadas")
const TOURNAMENTS_JSON = path.join(ROOT, "src", "data", "tournaments.json")
const MANIFEST_JSON = path.join(ROOT, "src", "data", "tournament-images.json")
const STATUS_JSON = path.join(ROOT, "src", "data", "photo-status.json")

const PHOTO_NAME = /^(\w+) ([A-Z ]+?) (\d{4}) (\d+)\.webp$/
const MAX_PHOTO_BYTES = 800 * 1024

const readJson = (file, fallback) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : fallback)
const writeJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n")

/** tournaments.json keeps short string arrays on one line for readability */
const writeTournaments = (data) => {
  const text = JSON.stringify(data, null, 2).replace(
    /\[\s*((?:"[^"]*",?\s*)+)\]/g,
    (_, body) => `[${body.match(/"[^"]*"/g).join(", ")}]`
  )
  fs.writeFileSync(TOURNAMENTS_JSON, text + "\n")
}

const loadTournaments = () => readJson(TOURNAMENTS_JSON, [])
const loadStatus = () => readJson(STATUS_JSON, { noPhotos: {} })

function parseArgs(argv) {
  const positional = []
  const flags = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      flags[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true
    } else positional.push(argv[i])
  }
  return { positional, flags }
}

function listPhotos() {
  if (!fs.existsSync(TOURNAMENTS_DIR)) return []
  return fs
    .readdirSync(TOURNAMENTS_DIR)
    .filter((f) => f.toLowerCase().endsWith(".webp"))
    .map((file) => {
      const m = file.match(PHOTO_NAME)
      return m ? { file, code: m[1], place: m[2], year: m[3], index: Number(m[4]) } : { file, invalid: true }
    })
}

function listInbox() {
  if (!fs.existsSync(INBOX_DIR)) return []
  return fs
    .readdirSync(INBOX_DIR, { withFileTypes: true })
    .filter((d) => d.isFile() && INPUT_EXTENSIONS.includes(path.extname(d.name).toLowerCase()))
    .map((d) => d.name)
}

// ---------------------------------------------------------------- manifest
function computeManifest() {
  const grouped = {}
  for (const p of listPhotos().filter((p) => !p.invalid)) (grouped[p.code] ??= []).push(p)
  const out = {}
  for (const code of Object.keys(grouped).sort()) {
    out[code] = grouped[code]
      .sort((a, b) => Number(b.year) - Number(a.year) || a.index - b.index || a.file.localeCompare(b.file))
      .map((p) => `${TOURNAMENTS_URL}/${p.file}`)
  }
  return out
}

function buildManifest() {
  const manifest = computeManifest()
  writeJson(MANIFEST_JSON, manifest)
  const total = Object.values(manifest).flat().length
  console.log(`✅ Lista de fotos actualizada: ${total} fotos en ${Object.keys(manifest).length} torneos.`)
}

// ---------------------------------------------------------------- status
function status({ json = false } = {}) {
  const tournaments = loadTournaments()
  const { noPhotos } = loadStatus()
  const photos = listPhotos()
  const inbox = listInbox()

  const report = tournaments.map((t) => {
    const mine = photos.filter((p) => p.code === t.tournamentCode)
    const perYear = {}
    for (const p of mine) perYear[p.year] = (perYear[p.year] ?? 0) + 1
    const discarded = noPhotos[t.tournamentCode] ?? {}
    return {
      code: t.tournamentCode,
      name: t.category,
      places: t.places ?? [t.city],
      years: t.years,
      photosPerYear: perYear,
      missingYears: t.years.filter((y) => !perYear[y] && !discarded[y]),
      discardedYears: Object.keys(discarded),
      photosForYearsNotOnCard: Object.keys(perYear).filter((y) => !t.years.includes(y)),
    }
  })
  const knownCodes = new Set(tournaments.map((t) => t.tournamentCode))
  const orphanCodes = [...new Set(photos.filter((p) => !p.invalid && !knownCodes.has(p.code)).map((p) => p.code))]
  const invalidNames = photos.filter((p) => p.invalid).map((p) => p.file)

  if (json) {
    console.log(JSON.stringify({ tournaments: report, inbox, orphanCodes, invalidNames }, null, 2))
    return
  }

  console.log("\n📸 ESTADO DE LAS FOTOS DE TORNEOS\n")
  let totalMissing = 0
  for (const r of report) {
    const years = r.years
      .map((y) => (r.photosPerYear[y] ? `${y} ✅${r.photosPerYear[y]}` : r.discardedYears.includes(y) ? `${y} 🚫` : `${y} ❌`))
      .join("  ")
    console.log(`• ${r.name} [${r.code}] — ${r.places.join(" / ")}`)
    console.log(`    ${years}`)
    if (r.photosForYearsNotOnCard.length)
      console.log(`    ⚠️  Hay fotos de ${r.photosForYearsNotOnCard.join(", ")} pero ese año no figura en la tarjeta`)
    totalMissing += r.missingYears.length
  }
  console.log(`\nLeyenda: ✅N = N fotos · ❌ = falta foto · 🚫 = marcado como "no tengo foto"`)
  console.log(`Años sin foto pendientes: ${totalMissing}`)
  if (orphanCodes.length) console.log(`⚠️  Fotos de torneos que no están en la lista: ${orphanCodes.join(", ")}`)
  if (invalidNames.length) console.log(`⚠️  Fotos con nombre incorrecto (la web las ignora): ${invalidNames.join(", ")}`)
  console.log(
    inbox.length
      ? `\n📥 En la carpeta fotos-nuevas hay ${inbox.length} foto(s) esperando: ${inbox.join(", ")}`
      : `\n📥 La carpeta fotos-nuevas está vacía.`
  )
}

// ---------------------------------------------------------------- review inbox
/** Lists pending photos with size and capture date (helps guess the tournament year). */
async function review() {
  const files = listInbox()
  if (!files.length) {
    console.log("📥 La carpeta fotos-nuevas está vacía.")
    return
  }
  const sharp = await loadSharp()
  for (const name of files) {
    const full = path.join(INBOX_DIR, name)
    let info = ""
    try {
      const meta = await sharp(fs.readFileSync(full)).metadata()
      // EXIF DateTimeOriginal is plain text "YYYY:MM:DD hh:mm:ss"
      const taken = meta.exif?.toString("latin1").match(/(\d{4}):(\d{2}):(\d{2}) \d{2}:\d{2}:\d{2}/)
      info = `${meta.width}x${meta.height}` + (taken ? `, sacada el ${taken[3]}/${taken[2]}/${taken[1]}` : ", sin fecha de cámara")
    } catch {
      info = path.extname(name).toLowerCase().startsWith(".hei") ? "HEIC (se convierte al agregarla)" : "no se pudo leer"
    }
    const modified = fs.statSync(full).mtime.toLocaleDateString("es-ES")
    console.log(`• ${name} — ${info} (archivo del ${modified})`)
  }
}

// ---------------------------------------------------------------- add
async function add(positional, flags) {
  const [fileArg] = positional
  const code = String(flags.torneo ?? "").toUpperCase()
  const year = String(flags.anio ?? flags["año"] ?? "")
  if (!fileArg || !code || !flags.lugar || !/^\d{4}$/.test(year)) {
    throw new Error('Uso: npm run fotos -- agregar <archivo> --torneo CODIGO --lugar "Lugar" --anio 2026')
  }
  const src = fs.existsSync(fileArg) ? fileArg : path.join(INBOX_DIR, fileArg)
  if (!fs.existsSync(src)) throw new Error(`No encuentro el archivo "${fileArg}" (ni en fotos-nuevas/).`)

  const tournaments = loadTournaments()
  const tournament = tournaments.find((t) => t.tournamentCode === code)
  if (!tournament) {
    throw new Error(
      `El torneo "${code}" no existe todavía. Códigos disponibles: ${tournaments.map((t) => t.tournamentCode).join(", ")}`
    )
  }
  const place = normalizePlace(String(flags.lugar))
  if (!place) throw new Error("El lugar no puede estar vacío.")
  const knownPlaces = (tournament.places ?? [tournament.city]).map(normalizePlace)
  if (!knownPlaces.includes(place)) {
    console.log(`⚠️  "${place}" no es uno de los lugares conocidos de este torneo (${knownPlaces.join(", ")}). Lo uso igual.`)
  }

  const used = listPhotos().filter((p) => p.code === code && p.place === place && p.year === year)
  const index = used.length ? Math.max(...used.map((p) => p.index)) + 1 : 0
  const name = `${code} ${place} ${year} ${index}.webp`
  const dest = path.join(TOURNAMENTS_DIR, name)

  const before = fs.statSync(src).size
  const after = await toWebp(src, dest)
  console.log(`✅ ${path.basename(src)} → ${name}  (${kb(before)} → ${kb(after)})`)

  // Show the year on the tournament card if it wasn't there yet
  if (!tournament.years.includes(year)) {
    tournament.years = [...tournament.years, year].sort((a, b) => Number(b) - Number(a))
    writeTournaments(tournaments)
    console.log(`   ➕ Agregué ${year} a los años de "${tournament.category}".`)
  }
  // A photo for a year previously marked as "no photo" un-discards it
  const st = loadStatus()
  if (st.noPhotos[code]?.[year]) {
    delete st.noPhotos[code][year]
    if (!Object.keys(st.noPhotos[code]).length) delete st.noPhotos[code]
    writeJson(STATUS_JSON, st)
  }

  // Keep the original as a backup (never committed) instead of deleting it
  if (path.resolve(path.dirname(src)) === path.resolve(INBOX_DIR)) {
    fs.mkdirSync(PROCESSED_DIR, { recursive: true })
    fs.renameSync(src, path.join(PROCESSED_DIR, path.basename(src)))
  }
  buildManifest()
}

// ---------------------------------------------------------------- discard / restore
function setDiscarded(positional, flags, discarded) {
  const [codeArg, year] = positional
  const code = String(codeArg ?? "").toUpperCase()
  if (!code || !/^\d{4}$/.test(String(year))) {
    throw new Error(`Uso: npm run fotos -- ${discarded ? "descartar" : "recuperar"} CODIGO AÑO`)
  }
  if (!loadTournaments().some((t) => t.tournamentCode === code)) throw new Error(`El torneo "${code}" no existe.`)
  const st = loadStatus()
  if (discarded) {
    ;(st.noPhotos[code] ??= {})[year] = typeof flags.motivo === "string" ? flags.motivo : "sin foto"
    console.log(`🚫 ${code} ${year} marcado como "no tengo foto". No lo voy a volver a pedir.`)
  } else {
    delete st.noPhotos[code]?.[year]
    if (st.noPhotos[code] && !Object.keys(st.noPhotos[code]).length) delete st.noPhotos[code]
    console.log(`↩️  ${code} ${year} vuelve a la lista de fotos pendientes.`)
  }
  writeJson(STATUS_JSON, st)
}

// ---------------------------------------------------------------- optimize existing
async function optimizeExisting(positional) {
  const dir = positional[0] ? path.resolve(positional[0]) : path.join(ROOT, "public", "images", "stringer")
  const sharp = await loadSharp()
  const files = []
  const walk = (d) =>
    fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const full = path.join(d, e.name)
      if (e.isDirectory()) walk(full)
      else if (e.name.toLowerCase().endsWith(".webp")) files.push(full)
    })
  walk(dir)
  let saved = 0
  for (const file of files) {
    const size = fs.statSync(file).size
    const meta = await sharp(fs.readFileSync(file)).metadata()
    const tooBig = size > MAX_PHOTO_BYTES || (Math.max(meta.width ?? 0, meta.height ?? 0) > 1600 && size > 300 * 1024)
    const hasPrivateData = Boolean(meta.exif) // may include GPS location
    if (!tooBig && !hasPrivateData) continue
    // Re-encoding a small file can make it bigger; only lower quality when it's oversized
    const after = await toWebp(file, file, { quality: tooBig ? 80 : 90 })
    saved += size - after
    console.log(`🗜️  ${path.relative(ROOT, file)}: ${kb(size)} → ${kb(after)}${hasPrivateData ? " (datos privados borrados)" : ""}`)
  }
  console.log(`✅ Listo. Ahorro total: ${kb(Math.max(saved, 0))}`)
}

// ---------------------------------------------------------------- verify (used before publishing)
function verify() {
  const errors = []
  const warnings = []
  const exists = (url) => {
    // Case-sensitive check: Vercel runs on Linux, where "Foto.webp" ≠ "foto.webp"
    const full = path.join(ROOT, "public", decodeURI(url))
    const dir = path.dirname(full)
    return fs.existsSync(dir) && fs.readdirSync(dir).includes(path.basename(full))
  }

  const tournaments = loadTournaments()
  const codes = new Set()
  for (const t of tournaments) {
    if (codes.has(t.tournamentCode)) errors.push(`Código de torneo repetido: ${t.tournamentCode}`)
    codes.add(t.tournamentCode)
    if (!/^\w+$/.test(t.tournamentCode)) errors.push(`Código inválido "${t.tournamentCode}" (solo letras, números y _)`)
    if (!t.years?.length || t.years.some((y) => !/^\d{4}$/.test(y))) errors.push(`Años inválidos en ${t.tournamentCode}`)
    for (const key of ["mensLogo", "womensLogo", "unifiedLogo"]) {
      if (t[key] && !exists(t[key])) errors.push(`Falta el logo ${t[key]} (${t.tournamentCode})`)
    }
  }

  const manifest = readJson(MANIFEST_JSON, {})
  const fresh = JSON.stringify(computeManifest())
  if (JSON.stringify(manifest) !== fresh) errors.push('La lista de fotos está desactualizada: corré "npm run fotos -- manifiesto"')
  for (const url of Object.values(manifest).flat()) if (!exists(url)) errors.push(`Falta la foto ${url}`)

  for (const p of listPhotos()) {
    const size = fs.statSync(path.join(TOURNAMENTS_DIR, p.file)).size
    if (p.invalid) warnings.push(`Nombre con formato incorrecto (no se muestra): ${p.file}`)
    if (size > 1.5 * 1024 * 1024) warnings.push(`Foto pesada (${kb(size)}): ${p.file} — "npm run fotos -- optimizar"`)
  }

  warnings.forEach((w) => console.log(`⚠️  ${w}`))
  if (errors.length) {
    errors.forEach((e) => console.log(`❌ ${e}`))
    process.exitCode = 1
  } else {
    console.log("✅ Fotos y logos verificados.")
  }
}

// ---------------------------------------------------------------- main
const [command = "estado", ...rest] = process.argv.slice(2)
const { positional, flags } = parseArgs(rest)
try {
  switch (command) {
    case "estado":
      status({ json: Boolean(flags.json) })
      break
    case "revisar":
      await review()
      break
    case "agregar":
      await add(positional, flags)
      break
    case "descartar":
      setDiscarded(positional, flags, true)
      break
    case "recuperar":
      setDiscarded(positional, flags, false)
      break
    case "manifiesto":
      buildManifest()
      break
    case "optimizar":
      await optimizeExisting(positional)
      break
    case "verificar":
      verify()
      break
    default:
      console.log(`Comando desconocido "${command}". Usá: estado | revisar | agregar | descartar | recuperar | manifiesto | optimizar | verificar`)
      process.exitCode = 1
  }
} catch (err) {
  console.error(`❌ ${err.message}`)
  process.exitCode = 1
}
