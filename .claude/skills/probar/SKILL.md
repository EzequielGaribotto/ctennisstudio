---
name: probar
description: Run the website locally so Pablo can see his changes before publishing, in Chrome and on his phone. Use when he says "probar", "test", "testear", "quiero verlo", "mostrame cómo queda", "abrí la página", "verlo en el celular", "localhost", or asks to preview changes.
---

# Probar (ver la página en tu computadora, sin publicar)

1. If `node_modules` is missing, run `npm ci` first ("Instalo lo necesario, tarda un minuto").
2. If a dev server is already running on port 3000, reuse it. Otherwise start `npm run dev` **in the background**
   and wait until http://localhost:3000 answers.
3. **Open it with the Chrome DevTools MCP** (`chrome-devtools` server, see `.mcp.json`) — it opens a real Chrome
   window he can see and use:
   - `new_page` (or `navigate_page` on the current page) → `http://localhost:3000` (or the page that changed, e.g.
     `/contact/`, `/services/set/`).
   - `take_screenshot` and look at it yourself: check the change is there and nothing looks broken.
   - `list_console_messages`: errors/warnings there are bugs → fix them before showing him.
   - For visual changes also check the phone layout: `emulate` a phone (e.g. iPhone viewport) or `resize_page` to
     390×844, screenshot, then restore the desktop size.
   - If the MCP isn't available (not approved / Chrome missing), fall back to `start http://localhost:3000` and tell
     Ezequiel's setup notes apply (docs/INSTALACION.md).
4. Tell him (plain words): "Te abrí la página de prueba en Chrome: **http://localhost:3000**. Es solo en tu
   computadora, nadie más la ve. Los cambios se actualizan solos." Point to exactly where the change is
   ("Bajá hasta *Experience Tour* y tocá la tarjeta del Mutua"). You can scroll/click there for him with the MCP.
5. **On his phone**: offer it for visual changes ("¿Querés verlo también en el celular?"). Run `npm run celular`: it
   opens a QR code; he scans it with the phone camera (same Wi-Fi). First time, Windows may show a Firewall window →
   "Redes privadas" + "Permitir". This is still private (only his home network).
6. Ask if he likes it and iterate. When he's happy: "Cuando quieras, decime **publicar** y lo subo a la web."
7. When he's done, stop the dev server and close the MCP page.
