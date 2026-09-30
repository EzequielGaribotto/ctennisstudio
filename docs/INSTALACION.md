# Instalación — trabajar en la web con Claude

Guía para dejar la computadora de Pablo (Windows) lista para modificar **ctenisstudio.com** hablando con Claude.
Se hace **una sola vez**.

---

## Parte 1 — Lo que hace Pablo (5 minutos)

1. **Instalá Visual Studio Code**: https://code.visualstudio.com → botón azul "Download for Windows" →
   abrí el archivo descargado → "Siguiente" en todo.
2. Abrí Visual Studio Code. A la izquierda, tocá el ícono de los **cuatro cuadraditos** (Extensiones),
   buscá **"Claude Code"** (de Anthropic) y tocá **Instalar**.
3. Aparece el ícono de Claude (arriba a la derecha o en la barra de la izquierda). Abrilo e **iniciá sesión con
   tu cuenta de Claude**.
4. **Modo automático (recomendado):** abajo de donde escribís hay un selector de modo de permisos.
   Elegí el modo **automático** ("Auto"). Si no lo encontrás, preguntale a Claude "¿dónde activo el modo automático?".
   Así Claude no te pregunta "¿permitís esto?" en cada paso; igual te va a preguntar lo importante
   (por ejemplo, antes de publicar).
5. Escribile a Claude este mensaje (copialo tal cual):

   > Configurá mi computadora para trabajar en mi página web siguiendo
   > https://raw.githubusercontent.com/EzequielGaribotto/ctennisstudio/main/docs/INSTALACION.md

6. Claude va a instalar lo necesario. Si Windows pregunta **"¿Permitir que esta aplicación haga cambios?"**,
   tocá **Sí**. Si se abre una ventana de **GitHub**, iniciá sesión con tu usuario **pablogaris**.
7. Cuando termine, en Visual Studio Code: **Archivo → Abrir carpeta…** → elegí la carpeta que te indique Claude
   (normalmente `Documentos\ctennisstudio`).
8. La primera vez que Claude quiera abrir la página, puede preguntarte si permitís el servidor
   **"chrome-devtools"**: decí que **sí** (es lo que usa para abrirte la página en Chrome y revisarla).

Listo. Desde ahí podés pedirle cosas como:

- "¿Qué fotos me faltan?" · "Te dejé fotos nuevas" · "No tengo fotos del Godó 2013"
- "Agregá el torneo de …" · "Cambiá el texto de cursos por …"
- **"probar"** → te muestra la página en Chrome, en tu computadora (nadie más la ve)
- **"verlo en el celular"** → te muestra un código QR para abrir la página de prueba en tu celular
- **"¿qué cambió?"** → te cuenta los últimos cambios de la web
- **"publicar"** → revisa todo, te pregunta y lo sube a la web real

---

## Parte 2 — Instrucciones para Claude

You are setting up Pablo's Windows PC. Talk to him in simple Spanish (see the repo's CLAUDE.md for tone).
Explain each step in one plain sentence before running it.

1. Download and run the setup script (installs Git + Node.js LTS + Google Chrome via winget if missing, clones the repo,
   sets the repo-local git identity to `pablogaris`, runs `npm ci`, saves the project location in
   `~/.claude/CLAUDE.md`, and checks GitHub push access):

   ```powershell
   $s = "$env:TEMP\setup-ctennisstudio.ps1"
   Invoke-WebRequest https://raw.githubusercontent.com/EzequielGaribotto/ctennisstudio/main/scripts/setup-windows.ps1 -OutFile $s
   powershell -ExecutionPolicy Bypass -File $s
   ```

   Default folder: `Documents\ctennisstudio` (or the old `Desktop\CTS\ctennisstudio` if it already exists).
   Pass `-Path "<folder>"` if Pablo wants it elsewhere.
   - winget may show a UAC prompt → tell him to click **Sí**.
   - If Git/Node were just installed and commands aren't found, ask him to close and reopen VS Code, then rerun.
   - The GitHub check opens the Git Credential Manager window → he signs in as **pablogaris**. If it reports no
     access, verify he accepted the collaborator invitation (https://github.com/EzequielGaribotto/ctennisstudio/invitations)
     and retry the script.

2. **Link GitHub in VS Code** (optional but handy; it's the same account): bottom-left **person icon
   (Accounts) → "Sign in with GitHub"** → browser → authorize as `pablogaris`. Walk him through it only if he
   isn't signed in.

3. Tell him to open the project folder in VS Code (File → Open Folder…) and start a new Claude conversation
   there. Verify with `npm run fotos` and, if he wants, run the **probar** skill so he sees his site locally.

4. Remind him about **auto mode** (step 4 of Parte 1) if he's being asked for permission often.

5. The project ships a **Chrome DevTools MCP** server in `.mcp.json` (`chrome-devtools`, run with `npx`). After
   opening the folder, if Claude Code asks to approve it, tell him to accept. Check it works by opening
   http://localhost:3000 with it (run the **probar** skill).

If the setup script fails, fix the cause (don't skip steps) and explain it simply.
