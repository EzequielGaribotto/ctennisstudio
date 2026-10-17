#!/usr/bin/env node
// Copies the country flags the website needs into public/images/flags/ so they are served from
// our own domain (no request to an outside CDN, which would send visitors' IP addresses to a third party).
//
//   npm run banderas       -> copies the flag of every country used in src/data/tournaments.json (+ ES/GB for the language switch)
//
// Run it after adding a tournament in a new country. `npm run fotos -- verificar` fails if a flag is missing.
// Source: the open-source "flag-icons" package (MIT), see public/images/flags/LICENSE.txt.
import fs from "fs"
import path from "path"
import { ROOT } from "./lib/images.mjs"

const SOURCE = path.join(ROOT, "node_modules", "flag-icons")
const DEST = path.join(ROOT, "public", "images", "flags")
const ALWAYS = ["ES", "GB"] // language switcher

export function neededCodes() {
  const tournaments = JSON.parse(fs.readFileSync(path.join(ROOT, "src", "data", "tournaments.json"), "utf8"))
  return [...new Set([...tournaments.map((t) => t.countryCode), ...ALWAYS])].sort()
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  if (!fs.existsSync(SOURCE)) {
    console.error('❌ Falta la librería de banderas. Ejecuta "npm ci" primero.')
    process.exit(1)
  }
  fs.mkdirSync(DEST, { recursive: true })
  const missing = []
  for (const code of neededCodes()) {
    const file = `${code.toLowerCase()}.svg`
    const from = path.join(SOURCE, "flags", "4x3", file)
    if (!fs.existsSync(from)) {
      missing.push(code)
      continue
    }
    fs.copyFileSync(from, path.join(DEST, file))
    console.log(`✓ ${file}`)
  }
  fs.copyFileSync(path.join(SOURCE, "LICENSE"), path.join(DEST, "LICENSE.txt"))
  if (missing.length) {
    console.error(`❌ No existe bandera para: ${missing.join(", ")} (revisa el código de país, debe ser ISO de 2 letras)`)
    process.exit(1)
  }
  console.log(`✅ Banderas copiadas a public/images/flags/`)
}
