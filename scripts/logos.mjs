#!/usr/bin/env node
// Reserve logos: tournament logos kept in the repo (assets-reserva/) but NOT published.
//
//   npm run logos                          -> list the reserve logos
//   npm run logos -- usar <nombre>         -> copy one into public/ so the site can show it
//
// After copying, reference it from the tournament in src/data/tournaments.json.
import fs from "fs"
import path from "path"
import { ROOT } from "./lib/images.mjs"

const RESERVE = path.join(ROOT, "assets-reserva", "tournament_logos")
const PUBLIC = path.join(ROOT, "public", "images", "stringer", "tournament_logos")

function listReserve(dir = RESERVE, prefix = "") {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? listReserve(path.join(dir, e.name), `${prefix}${e.name}/`) : e.name.endsWith(".webp") ? [`${prefix}${e.name.replace(/\.webp$/, "")}`] : []
  )
}

const [command = "listar", name] = process.argv.slice(2)
const logos = listReserve()

if (command === "listar") {
  console.log("🗄️  Logos de reserva (en el repositorio, NO publicados):\n")
  logos.forEach((l) => console.log(`  • ${l}`))
  console.log('\nPara usar uno: npm run logos -- usar <nombre>   (ejemplo: usar roland_garros_logo)')
} else if (command === "usar") {
  const match = logos.find((l) => l === name || l.endsWith(`/${name}`))
  if (!name || !match) {
    console.error(`❌ No encuentro "${name ?? ""}" en la reserva. Disponibles: ${logos.join(", ")}`)
    process.exit(1)
  }
  const src = path.join(RESERVE, `${match}.webp`)
  const dest = path.join(PUBLIC, `${match}.webp`)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
  console.log(`✅ Copiado a public: /images/stringer/tournament_logos/${match}.webp`)
  console.log("   Ahora añádelo al torneo en src/data/tournaments.json (unifiedLogo / mensLogo / womensLogo).")
  console.log("   ⚠️  Son marcas de terceros: mira docs/LEGAL.md antes de publicarlo.")
} else {
  console.error('Uso: npm run logos [-- listar | usar <nombre>]')
  process.exit(1)
}
