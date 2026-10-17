#!/usr/bin/env node
// Start-of-session checklist: what is still pending with the owner (Pablo).
//
//   npm run pendientes
//
// Claude runs this at the start of every session (see CLAUDE.md) and asks Pablo for whatever is pending,
// in plain words, one thing at a time.
import fs from "fs"
import path from "path"
import { spawnSync } from "child_process"
import { ROOT } from "./lib/images.mjs"

const legalSource = fs.readFileSync(path.join(ROOT, "src", "data", "legal.ts"), "utf8")
const field = (name) => legalSource.match(new RegExp(`${name}:\\s*"([^"]*)"`))?.[1]?.trim() ?? ""
const taxId = field("taxId")
const confirmed = /confirmedByOwner:\s*true/.test(legalSource)
const holderName = field("holderName")
const address = legalSource.match(/address:\s*CONTACT\.address/) ? "C/ Jacint Verdaguer, 31, Mataró" : field("address")

let pending = 0

if (!taxId || !confirmed) {
  pending++
  console.log("⚖️  DATOS LEGALES PENDIENTES (la web todavía no puede mostrar el aviso legal, la política de privacidad ni la de cookies)")
  console.log("   Hay que PEDIRLE A PABLO, con palabras sencillas, y por el momento las páginas están apagadas:")
  if (!taxId) console.log("   • Su NIF o DNI (o el CIF si tiene una sociedad). Se verá en el aviso legal, como exige la ley.")
  console.log(
    holderName
      ? `   • Confirmar su nombre completo tal como figura en Hacienda (ahora pone: "${holderName}").`
      : "   • Su nombre completo tal como figura en Hacienda (nombre y dos apellidos)."
  )
  console.log(`   • Confirmar que este es su domicilio profesional: "${address}".`)
  console.log("   • Si trabaja como autónomo o tiene una sociedad (decide cómo se redacta el titular).")
  console.log("   Cuando los dé: completar src/data/legal.ts (taxId, holderName y, si procede, address), poner confirmedByOwner: true,")
  console.log("   probar con «probar» (las páginas /aviso-legal, /privacidad y /cookies, y la casilla del formulario) y proponer publicar.")
  console.log("   Recuérdale que un gestor debería revisar los textos (ver docs/LEGAL.md).\n")
}

const photos = spawnSync("node", [path.join("scripts", "fotos.mjs"), "recordatorio"], { cwd: ROOT, encoding: "utf8" }).stdout.trim()
if (photos && !photos.startsWith("✅")) {
  pending++
  console.log(photos + "\n")
}

if (!pending) console.log("✅ Nada pendiente con Pablo.")
