#!/usr/bin/env node
// Converts any photo/logo into an optimized WebP for the site (non-tournament images:
// services, portraits, logos...). Tournament photos use "npm run fotos -- agregar".
//
//   npm run imagen -- <origen> <destino.webp> [--max 1600] [--quitar-fondo] [--calidad 80]
//
//   --quitar-fondo  turns near-white pixels transparent (for logos on white backgrounds)
//   --max 0         keeps the original size (use for logos you need very sharp)
import fs from "fs"
import path from "path"
import { ROOT, toWebp, kb, MAX_SIDE_PX, WEBP_QUALITY } from "./lib/images.mjs"

const args = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : fallback
}
const positional = args.filter((a, i) => !a.startsWith("--") && !["--max", "--calidad"].includes(args[i - 1]))
const [src, destArg] = positional

if (!src || !destArg) {
  console.log("Uso: npm run imagen -- <origen> <destino.webp> [--max 1600] [--quitar-fondo] [--calidad 80]")
  process.exit(1)
}
if (!fs.existsSync(src)) {
  console.error(`❌ No encuentro "${src}"`)
  process.exit(1)
}

const dest = path.resolve(ROOT, destArg.endsWith(".webp") ? destArg : `${destArg}.webp`)
if (!dest.startsWith(path.join(ROOT, "public"))) {
  console.error("❌ El destino tiene que estar dentro de la carpeta public/")
  process.exit(1)
}

try {
  const size = await toWebp(src, dest, {
    maxSide: Number(flag("max", MAX_SIDE_PX)),
    quality: Number(flag("calidad", WEBP_QUALITY)),
    removeWhiteBg: args.includes("--quitar-fondo"),
  })
  const url = "/" + path.relative(path.join(ROOT, "public"), dest).split(path.sep).join("/")
  console.log(`✅ ${path.basename(src)} (${kb(fs.statSync(src).size)}) → ${url} (${kb(size)})`)
} catch (err) {
  console.error(`❌ ${err.message}`)
  process.exit(1)
}
