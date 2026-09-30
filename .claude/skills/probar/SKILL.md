---
name: probar
description: Run the website locally so Pablo can see his changes before publishing. Use when he says "probar", "test", "testear", "quiero verlo", "mostrame cómo queda", "abrí la página", "localhost", or asks to preview changes.
---

# Probar (ver la página en tu computadora, sin publicar)

1. If `node_modules` is missing, run `npm ci` first ("Instalo lo necesario, tarda un minuto").
2. If a dev server is already running on port 3000, reuse it. Otherwise start `npm run dev` **in the background**
   and wait until http://localhost:3000 answers.
3. Open it for him: `start http://localhost:3000` (Windows) and tell him:
   "Te abrí la página de prueba: **http://localhost:3000**. Esto es solo en tu computadora, nadie más lo ve.
   Los cambios que hagamos se actualizan solos; si no, apretá F5."
4. Point him to exactly where the change is ("Bajá hasta *Experience Tour* y tocá la tarjeta del Mutua").
   Mention checking on a phone-sized window if the change is visual (Ctrl+Shift+M in the browser's F12 tools,
   or just narrow the window).
5. Ask if he likes it. Iterate. When he's happy, suggest: "Cuando quieras, decime **publicar** y lo subo a la web."
6. When the session ends or he's done, stop the dev server.

If something errors, fix it; explain in plain words only what matters to him.
