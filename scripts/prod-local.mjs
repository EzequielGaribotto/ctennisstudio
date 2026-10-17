#!/usr/bin/env node
// Production-like build/start for CHECKING the site, in a separate folder (.next-build) so it never
// overwrites the .next folder used by the dev server (`npm run dev`) that may be open at the same time.
//
//   npm run build:local            -> lint + photo check + production build into .next-build
//   npm run start:local [-- 3100]  -> serve that build (default port 3100)
import { spawn, spawnSync } from "child_process"

const env = { ...process.env, NEXT_DIST_DIR: ".next-build" }
const [command, port = "3100"] = process.argv.slice(2)

if (command === "build") {
  const run = spawnSync("npm", ["run", "build"], { env, stdio: "inherit", shell: true })
  process.exit(run.status ?? 1)
} else if (command === "start") {
  console.log(`Sirviendo la versión de producción en http://localhost:${port} (Ctrl+C para parar)`)
  spawn("npx", ["next", "start", "-p", port], { env, stdio: "inherit", shell: true })
} else {
  console.error("Uso: node scripts/prod-local.mjs build | start [puerto]")
  process.exit(1)
}
