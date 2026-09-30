// Shared image helpers for the maintenance scripts (photos, favicons, generic images).
import fs from "fs"
import os from "os"
import path from "path"
import { execFileSync } from "child_process"
import { fileURLToPath } from "url"

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..")
export const INPUT_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".avif", ".tif", ".tiff"]

export const MAX_SIDE_PX = 1600 // longest side for photos shown on the site
export const WEBP_QUALITY = 80

export const loadSharp = async () => {
  const sharp = (await import("sharp")).default
  sharp.cache(false) // don't keep files open on Windows (lets us overwrite them in place)
  return sharp
}

/**
 * sharp's prebuilt binaries can't decode iPhone HEIC files. On Windows we try the
 * system codec (WIC) to turn them into a temporary JPG first.
 */
function heicToJpg(file) {
  if (process.platform !== "win32") return null
  const out = path.join(os.tmpdir(), `heic-${Date.now()}-${path.basename(file)}.jpg`)
  const ps = `
Add-Type -AssemblyName PresentationCore
$in = [System.IO.File]::OpenRead($env:SRC)
try {
  $dec = [System.Windows.Media.Imaging.BitmapDecoder]::Create($in, 'None', 'OnLoad')
  $enc = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
  $enc.QualityLevel = 95
  $enc.Frames.Add($dec.Frames[0])
  $o = [System.IO.File]::Create($env:DST); $enc.Save($o); $o.Close()
} finally { $in.Close() }`
  try {
    execFileSync("powershell", ["-NoProfile", "-NonInteractive", "-Command", ps], {
      env: { ...process.env, SRC: file, DST: out },
      stdio: "ignore",
    })
    return fs.existsSync(out) ? out : null
  } catch {
    return null
  }
}

/**
 * Converts any supported image to an optimized WebP:
 * auto-rotates using the camera orientation, shrinks to maxSide, and drops all
 * metadata (EXIF/GPS location) so photos never leak where they were taken.
 */
export async function toWebp(src, dest, { maxSide = MAX_SIDE_PX, quality = WEBP_QUALITY, removeWhiteBg = false } = {}) {
  const sharp = await loadSharp()
  let input = src
  let tmp = null
  const ext = path.extname(src).toLowerCase()
  if (ext === ".heic" || ext === ".heif") {
    tmp = heicToJpg(src)
    if (!tmp) {
      throw new Error(
        `No pude abrir "${path.basename(src)}" (formato HEIC de iPhone). ` +
          `Solución: abrila con la app Fotos de Windows y usá "Guardar como" JPG, ` +
          `o mandátela por WhatsApp/email y descargala de nuevo (se convierte sola).`
      )
    }
    input = tmp
  }

  try {
    let pipeline = sharp(fs.readFileSync(input)).rotate()
    if (maxSide) pipeline = pipeline.resize({ width: maxSide, height: maxSide, fit: "inside", withoutEnlargement: true })

    if (removeWhiteBg) {
      const { data, info } = await pipeline.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
      const WHITE = 240
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > WHITE && data[i + 1] > WHITE && data[i + 2] > WHITE) data[i + 3] = 0
      }
      pipeline = sharp(data, { raw: info })
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true })
    // Write to a temp file first so re-optimizing a file in place is safe
    const tmpOut = `${dest}.tmp-${process.pid}`
    await pipeline.webp({ quality, effort: 5 }).toFile(tmpOut)
    fs.renameSync(tmpOut, dest)
    return fs.statSync(dest).size
  } finally {
    if (tmp) fs.rmSync(tmp, { force: true })
  }
}

export const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

/** "Montecarlo" / "La Bisbal" / "Girona" -> "MONTECARLO" / "LA BISBAL" (site filename format) */
export const normalizePlace = (place) =>
  place
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
