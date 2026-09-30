#!/usr/bin/env node
// Readable history of what changed on the website (published = pushed to main).
//
//   npm run historial [-- 20]      -> last 20 changes (default 15)
import { execFileSync } from "child_process"

const limit = Number(process.argv[2]) || 15
const WHO = { pablogaris: "Pablo", pablo: "Pablo", ezequielgaribotto: "Ezequiel", ezequiel: "Ezequiel" }

const who = (name, email) => {
  const key = `${name} ${email}`.toLowerCase()
  const match = Object.keys(WHO).find((k) => key.includes(k))
  return match ? WHO[match] : name
}

let published = new Set()
try {
  published = new Set(execFileSync("git", ["rev-list", "origin/main"], { encoding: "utf8" }).split("\n"))
} catch {
  // no remote info yet: treat everything as unknown
}

const SEP = "\u001f"
const log = execFileSync(
  "git",
  ["log", "--no-merges", `-n${limit}`, `--format=%H${SEP}%ad${SEP}%an${SEP}%ae${SEP}%s`, "--date=format:%d/%m/%Y %H:%M"],
  { encoding: "utf8" }
)

console.log("\n🕓 ÚLTIMOS CAMBIOS DE LA WEB\n")
for (const line of log.trim().split("\n").filter(Boolean)) {
  const [hash, date, name, email, subject] = line.split(SEP)
  const status = published.has(hash) ? "✅ publicado" : "⏳ sin publicar"
  console.log(`• ${date} — ${who(name, email)} — ${subject}  [${status}] (${hash.slice(0, 7)})`)
}
