#!/usr/bin/env node
// Security gate for the website. Runs before every publish (and every `npm run build`).
//
//   npm run seguridad                      -> all local checks
//   npm run seguridad -- --live            -> also probe the live site (headers + contact form protection)
//   npm run seguridad -- --live <url>      -> probe another address (default https://ctenisstudio.com)
//
// ❌ = blocks publishing (exit code 1)     ⚠️ = needs attention but doesn't block
//
// Output is written for people who aren't developers: each finding says what could go wrong.
import fs from "fs"
import path from "path"
import { spawnSync } from "child_process"
import { ROOT } from "./lib/images.mjs"

const errors = []
const warnings = []
const fail = (msg) => errors.push(msg)
const warn = (msg) => warnings.push(msg)

const read = (rel) => (fs.existsSync(path.join(ROOT, rel)) ? fs.readFileSync(path.join(ROOT, rel), "utf8") : null)
const git = (args) => spawnSync("git", args, { cwd: ROOT, encoding: "utf8" }).stdout.split("\n").filter(Boolean)

// ------------------------------------------------------------------ 1. dependencies with known holes
function checkDependencies() {
  const run = spawnSync("npm", ["audit", "--omit=dev", "--json"], { cwd: ROOT, encoding: "utf8", shell: true })
  let report
  try {
    report = JSON.parse(run.stdout)
  } catch {
    fail("No pude revisar si las librerías de la web tienen fallos de seguridad conocidos (¿hay internet?). Sin esa revisión no se publica.")
    return
  }
  if (report.error) {
    fail(`No pude revisar las librerías: ${report.error.summary ?? "error desconocido"}`)
    return
  }
  const v = report.metadata?.vulnerabilities ?? {}
  const serious = (v.high ?? 0) + (v.critical ?? 0)
  if (serious > 0) {
    const names = Object.entries(report.vulnerabilities ?? {})
      .filter(([, info]) => ["high", "critical"].includes(info.severity))
      .map(([name]) => name)
    fail(`Hay ${serious} librería(s) con fallos de seguridad graves conocidos (${names.join(", ")}): se pueden usar para atacar la web. Hay que actualizarlas ("npm audit fix").`)
  }
  if ((v.moderate ?? 0) + (v.low ?? 0) > 0) warn(`Hay ${(v.moderate ?? 0) + (v.low ?? 0)} fallo(s) de seguridad menores en librerías: conviene actualizarlas pronto.`)
}

// ------------------------------------------------------------------ 2. secrets in the code
const SECRET_PATTERNS = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "una clave privada"],
  [/\bAKIA[0-9A-Z]{16}\b/, "una clave de Amazon (AWS)"],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{30,}\b/, "una clave de GitHub"],
  [/\bsk_(live|test)_[A-Za-z0-9]{16,}\b/, "una clave de Stripe"],
  [/\bre_[A-Za-z0-9]{20,}\b/, "una clave de Resend (el servicio de correo)"],
  [/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/, "una clave de Slack"],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, "una clave de Google"],
  [/\b0x4[A-Za-z0-9_-]{20,}\b.*turnstile/i, "una clave secreta de Cloudflare"],
  [/(api[_-]?key|secret|token|password|passwd)["']?\s*[:=]\s*["'][^"'\s]{16,}["']/i, "una contraseña o clave escrita en el código"],
]
const TEXT_EXT = /\.(ts|tsx|js|jsx|mjs|cjs|json|md|css|html|yml|yaml|env|ps1|txt|webmanifest)$/i
const SKIP_FILES = new Set(["package-lock.json", "scripts/seguridad.mjs"])
const PLACEHOLDER = /(1x0{20,}|2x0{20,}|3x0{20,}|example|placeholder|your[_-]|xxxx|changeme|<[^>]+>)/i // Cloudflare dummy keys etc.

function checkSecrets() {
  const files = [...git(["ls-files"]), ...git(["ls-files", "-o", "--exclude-standard"])]
  const hits = []
  for (const rel of files) {
    if (SKIP_FILES.has(rel) || !TEXT_EXT.test(rel) || rel.startsWith("fotos-nuevas/")) continue
    const full = path.join(ROOT, rel)
    if (!fs.existsSync(full) || fs.statSync(full).size > 2_000_000) continue
    const lines = fs.readFileSync(full, "utf8").split("\n")
    lines.forEach((line, i) => {
      for (const [pattern, what] of SECRET_PATTERNS) {
        if (pattern.test(line) && !PLACEHOLDER.test(line)) hits.push(`${rel}:${i + 1} (${what})`)
      }
    })
  }
  if (hits.length) fail(`Parece haber claves o contraseñas dentro del código (cualquiera que vea el código podría usarlas): ${hits.slice(0, 5).join("; ")}`)

  const envTracked = git(["ls-files"]).filter((f) => /(^|\/)\.env(\..*)?$/.test(f) && !f.endsWith(".example"))
  if (envTracked.length) fail(`Hay archivos de claves guardados en el proyecto público: ${envTracked.join(", ")}`)
  if (!(read(".gitignore") ?? "").includes(".env")) fail('El archivo .gitignore no protege los archivos ".env" (donde van las claves).')
}

// ------------------------------------------------------------------ 3. risky code patterns
function listSourceFiles(dir, out = []) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) listSourceFiles(rel, out)
    else if (/\.(ts|tsx|js|jsx)$/.test(e.name)) out.push(rel)
  }
  return out
}

const RISKY = [
  [/dangerouslySetInnerHTML/, "inserta HTML sin filtrar (permite que alguien meta código malicioso en la página)"],
  [/\beval\s*\(|new\s+Function\s*\(/, "ejecuta texto como código (muy peligroso)"],
  [/document\.write\s*\(|\.innerHTML\s*=|insertAdjacentHTML\s*\(/, "escribe HTML directamente en la página (puede dejar entrar código malicioso)"],
  [/http:\/\/(?!localhost|127\.0\.0\.1|www\.w3\.org)/, "usa una dirección sin cifrar (http://) en vez de https://"],
  [/cdn\.jsdelivr|unpkg\.com|cdnjs\.cloudflare|fonts\.googleapis|fonts\.gstatic|googletagmanager|google-analytics|connect\.facebook\.net/, "carga algo desde un servidor externo (envía la IP de cada visitante a otra empresa sin permiso; hay que alojarlo en la propia web)"],
]

function checkCodePatterns() {
  const files = [...listSourceFiles("src"), "next.config.js"]
  for (const rel of files) {
    const text = read(rel)
    if (!text) continue
    const lines = text.split("\n")
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return // comments
      for (const [pattern, what] of RISKY) if (pattern.test(line)) fail(`${rel}:${i + 1} ${what}.`)
    })
    for (const m of text.matchAll(/<a\b[^>]*?target=\{?["']_blank["']\}?[^>]*?>/gs)) {
      if (!/noopener/.test(m[0])) fail(`${rel}: un enlace que abre pestaña nueva no tiene rel="noopener noreferrer" (la página destino podría tomar el control de esta).`)
    }
    // window.open(...) allowing one level of nested parentheses in the arguments
    for (const m of text.matchAll(/window\.open\((?:[^()]|\([^()]*\))*\)/g)) {
      if (!/noopener/.test(m[0])) fail(`${rel}: window.open sin "noopener,noreferrer" (la página abierta podría tomar el control de esta).`)
    }
  }
}

// ------------------------------------------------------------------ 4. protections still in place
function checkProtections() {
  const mw = read("src/middleware.ts") ?? ""
  if (!mw) {
    fail("Falta src/middleware.ts: sin él la web pierde la política que impide ejecutar código ajeno (CSP).")
  } else {
    const scriptSrc = mw.match(/script-src[^`"]*/)?.[0] ?? ""
    if (!/nonce-/.test(scriptSrc) || !/strict-dynamic/.test(scriptSrc)) fail("La política de seguridad (CSP) ya no exige la marca única por visita para los scripts.")
    if (/unsafe-inline|unsafe-eval/.test(scriptSrc)) fail("La política de seguridad (CSP) permite scripts sin control ('unsafe-inline'/'unsafe-eval'): hay que quitarlo.")
    for (const needed of ["frame-ancestors", "object-src 'none'", "base-uri", "form-action"]) {
      if (!mw.includes(needed)) fail(`A la política de seguridad (CSP) le falta "${needed}".`)
    }
  }

  const cfg = read("next.config.js") ?? ""
  for (const header of ["X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"]) {
    if (!cfg.includes(header)) fail(`Falta la cabecera de seguridad ${header} en next.config.js.`)
  }

  const mcp = read(".mcp.json")
  if (mcp) {
    for (const [serverName, server] of Object.entries(JSON.parse(mcp).mcpServers ?? {})) {
      const args = server.args ?? []
      const pkg = args.slice(args.indexOf("npx") + 1).find((a) => !a.startsWith("-"))
      if (args.includes("npx") && !/@\d+\.\d+\.\d+/.test(pkg ?? "")) {
        fail(`La herramienta "${serverName}" de .mcp.json no tiene versión fija (${pkg}): cada vez bajaría la última versión de internet y la ejecutaría en el ordenador de Pablo.`)
      }
    }
  }

  const settings = read(".claude/settings.json") ?? ""
  for (const needed of ["git push --force", "git reset --hard"]) {
    if (!settings.includes(needed)) fail(`Falta en .claude/settings.json el bloqueo de "${needed}".`)
  }

  const pkg = JSON.parse(read("package.json") ?? "{}")
  for (const [name, version] of Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })) {
    if (/^(latest|\*|x|https?:|git[:+]|github:|file:)/.test(version)) fail(`La librería ${name} usa una versión sin control ("${version}").`)
  }
  if (!fs.existsSync(path.join(ROOT, "package-lock.json"))) fail("Falta package-lock.json: sin él cada instalación podría traer versiones distintas de las librerías.")
}

// ------------------------------------------------------------------ 4b. legal texts
function checkLegal() {
  const legal = read("src/data/legal.ts") ?? ""
  const taxId = legal.match(/taxId:\s*"([^"]*)"/)?.[1]?.trim()
  if (!taxId || !/confirmedByOwner:\s*(false as boolean|true)/.test(legal) || /confirmedByOwner:\s*false/.test(legal)) {
    warn("Faltan los datos legales de Pablo (NIF y confirmaciones): el aviso legal, la política de privacidad y la de cookies siguen apagados, así que la web aún no cumple con esa obligación legal. Hay que pedírselos (ver docs/LEGAL.md y `npm run pendientes`).")
  }
}

// ------------------------------------------------------------------ 5. live site probe
async function checkLive(base) {
  const url = base.replace(/\/$/, "")
  try {
    const res = await fetch(`${url}/`, { redirect: "follow", signal: AbortSignal.timeout(15000) })
    const h = res.headers
    const csp = h.get("content-security-policy") ?? ""
    if (!/script-src[^;]*nonce-/.test(csp)) fail(`[web en vivo] La política de seguridad (CSP) no está activa en ${url}.`)
    if (/script-src[^;]*unsafe-inline/.test(csp)) fail("[web en vivo] La política de seguridad permite scripts sin control.")
    if (!/max-age=\d{7,}/.test(h.get("strict-transport-security") ?? "")) fail("[web en vivo] Falta la obligación de usar https (HSTS).")
    if (h.get("x-content-type-options") !== "nosniff") fail("[web en vivo] Falta la cabecera X-Content-Type-Options.")
    if (!h.get("x-frame-options") && !/frame-ancestors/.test(csp)) fail("[web en vivo] La web podría ser incrustada en páginas falsas (clickjacking).")
    const html = await res.text()
    const nonces = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>/g)].filter((m) => !/nonce=/.test(m[0]))
    if (nonces.length) fail(`[web en vivo] Hay ${nonces.length} script(s) en la página sin la marca de la política de seguridad.`)

    // Contact form: an empty request must be refused by the human check BEFORE anything is sent
    const probe = await fetch(`${url}/api/contact/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
      signal: AbortSignal.timeout(15000),
    })
    const body = await probe.json().catch(() => ({}))
    if (probe.status === 403 && body.error === "Verification failed") {
      console.log("✅ [web en vivo] El formulario de contacto exige la verificación anti-spam (Turnstile).")
    } else {
      warn("[web en vivo] El formulario de contacto NO exige todavía la verificación anti-spam: cualquiera (o un robot) puede llenarlo de mensajes. Faltan las claves de Cloudflare Turnstile en Vercel (ver docs/SEGURIDAD.md).")
    }
  } catch (err) {
    fail(`[web en vivo] No pude comprobar ${url}: ${err.message}`)
  }
}

// ------------------------------------------------------------------ main
const args = process.argv.slice(2)
console.log("🔒 Revisión de seguridad de la web\n")
checkDependencies()
checkSecrets()
checkCodePatterns()
checkProtections()
checkLegal()
const liveIdx = args.indexOf("--live")
if (liveIdx >= 0) await checkLive(args[liveIdx + 1] && !args[liveIdx + 1].startsWith("--") ? args[liveIdx + 1] : "https://ctenisstudio.com")

warnings.forEach((w) => console.log(`⚠️  ${w}`))
if (errors.length) {
  errors.forEach((e) => console.log(`❌ ${e}`))
  console.log("\n⛔ No se puede publicar hasta arreglar lo marcado con ❌.")
  process.exitCode = 1
} else {
  console.log(`✅ Todo en orden${warnings.length ? " (con avisos)" : ""}.`)
}
