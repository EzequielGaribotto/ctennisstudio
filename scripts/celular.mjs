#!/usr/bin/env node
// Shows how to open the local site (npm run dev) on a phone connected to the same Wi-Fi:
// prints the network address and opens a QR code to scan with the phone camera.
//
//   npm run celular [-- --puerto 3000]
import fs from "fs"
import os from "os"
import path from "path"
import { execFile } from "child_process"
import QRCode from "qrcode"

const args = process.argv.slice(2)
const portIdx = args.indexOf("--puerto")
const port = portIdx >= 0 ? Number(args[portIdx + 1]) : 3000

// Private LAN IPv4 addresses (skip virtual adapters like WSL/Docker/VirtualBox when possible)
const candidates = Object.entries(os.networkInterfaces())
  .flatMap(([name, addrs]) => (addrs ?? []).map((a) => ({ name, ...a })))
  .filter((a) => a.family === "IPv4" && !a.internal && /^(192\.168|10\.|172\.(1[6-9]|2\d|3[01]))/.test(a.address))
  .sort((a, b) => Number(/vethernet|wsl|docker|virtual|vbox|vmware/i.test(a.name)) - Number(/vethernet|wsl|docker|virtual|vbox|vmware/i.test(b.name)))

if (!candidates.length) {
  console.log("❌ No encuentro la red Wi-Fi/cable de esta computadora. ¿Está conectada a internet?")
  process.exit(1)
}

const url = `http://${candidates[0].address}:${port}`
const out = path.join(os.tmpdir(), "ctennisstudio-celular.png")
await QRCode.toFile(out, url, { width: 480, margin: 2 })

console.log(`📱 Dirección para el celular: ${url}`)
console.log("   1. El celular tiene que estar en el MISMO Wi-Fi que esta computadora.")
console.log("   2. Abrí la cámara del celular y apuntá al código QR que se abrió en pantalla.")
console.log('   3. Si Windows pregunta por el "Firewall", marcá "Redes privadas" y tocá "Permitir".')
if (candidates.length > 1) console.log(`   (Otras direcciones posibles: ${candidates.slice(1).map((c) => c.address).join(", ")})`)

if (process.platform === "win32") execFile("cmd", ["/c", "start", "", out])
else if (process.platform === "darwin") execFile("open", [out])
else if (fs.existsSync("/usr/bin/xdg-open")) execFile("xdg-open", [out])
