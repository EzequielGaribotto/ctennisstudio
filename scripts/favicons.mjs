#!/usr/bin/env node
// Regenerates every site icon (browser tab, iPhone home screen, Android) from one logo.
//
//   npm run favicons                          -> uses public/images/logo/ctennisstudio_icon.webp
//   npm run favicons -- ruta/al/logo.png --margen 10
//
// Outputs the files layout.tsx and site.webmanifest already point to.
import fs from "fs"
import path from "path"
import { ROOT, loadSharp } from "./lib/images.mjs"

const args = process.argv.slice(2)
const marginIdx = args.indexOf("--margen")
const marginPercent = marginIdx >= 0 ? Number(args[marginIdx + 1]) : 0
const source = path.resolve(args.find((a, i) => !a.startsWith("--") && (marginIdx < 0 || i !== marginIdx + 1)) ?? path.join(ROOT, "public/images/logo/ctennisstudio_icon.webp"))

const PNG_SIZES = {
  "public/images/favicon-16x16.png": 16,
  "public/images/favicon-32x32.png": 32,
  "public/images/apple-touch-icon.png": 180,
  "public/images/android-chrome-192x192.png": 192,
  "public/images/android-chrome-512x512.png": 512,
}
const ICO_SIZES = [16, 32, 48]

/** ICO files can embed PNGs directly: 6-byte header + 16 bytes per image + the PNG data. */
function buildIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(pngs.length, 4)
  let offset = 6 + 16 * pngs.length
  const entries = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16)
    e.writeUInt8(size >= 256 ? 0 : size, 0)
    e.writeUInt8(size >= 256 ? 0 : size, 1)
    e.writeUInt16LE(1, 4) // color planes
    e.writeUInt16LE(32, 6) // bits per pixel
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    return e
  })
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

if (!fs.existsSync(source)) {
  console.error(`❌ No encuentro el logo: ${source}`)
  process.exit(1)
}

const sharp = await loadSharp()
const input = fs.readFileSync(source)
const meta = await sharp(input).metadata()
const side = Math.round(Math.max(meta.width, meta.height) * (1 + marginPercent / 100))
// Center the logo on a transparent square canvas
const square = await sharp(input)
  .resize({ width: side, height: side, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

const render = (size) => sharp(square).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer()

for (const [file, size] of Object.entries(PNG_SIZES)) {
  fs.writeFileSync(path.join(ROOT, file), await render(size))
  console.log(`✓ ${file} (${size}x${size})`)
}
const icoImages = await Promise.all(ICO_SIZES.map(async (size) => ({ size, data: await render(size) })))
fs.writeFileSync(path.join(ROOT, "public/favicon.ico"), buildIco(icoImages))
console.log(`✓ public/favicon.ico (${ICO_SIZES.join(", ")})`)
console.log("✅ Íconos generados. Puede tardar un rato en verse en el navegador (guarda los íconos viejos).")
