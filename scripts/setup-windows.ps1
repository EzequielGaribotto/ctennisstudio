# One-time setup of Pablo's Windows PC for working on the website with Claude.
# Safe to run again: it skips whatever is already done.
#
#   powershell -ExecutionPolicy Bypass -File setup-windows.ps1 [-Path "C:\Users\pablo\Documents\ctennisstudio"]
#
# Works on Windows PowerShell 5.1 and PowerShell 7.
param(
  [string]$Path = "",
  [string]$GitHubUser = "pablogaris",
  [string]$GitName = "Pablo Garibotto"
)

$ErrorActionPreference = "Stop"
$RepoUrl = "https://github.com/EzequielGaribotto/ctennisstudio.git"

function Say($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Ok($msg) { Write-Host "    OK: $msg" -ForegroundColor Green }
function Refresh-Path {
  $env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")
}
function Has($cmd) { [bool](Get-Command $cmd -ErrorAction SilentlyContinue) }

function Ensure-Tool($cmd, $wingetId, $label) {
  if (Has $cmd) { Ok "$label ya estaba instalado"; return }
  Say "Instalando $label (puede pedir permiso de administrador)..."
  winget install --id $wingetId -e --accept-source-agreements --accept-package-agreements --silent
  Refresh-Path
  if (-not (Has $cmd)) { throw "No se pudo instalar $label. Reinicia la computadora y vuelve a correr este paso." }
  Ok "$label instalado"
}

# 1. Tools ---------------------------------------------------------------
if (-not (Has "winget")) { throw "Falta 'winget' (App Installer de Microsoft Store). Instalalo desde la Microsoft Store y reintenta." }
Ensure-Tool "git" "Git.Git" "Git"
Ensure-Tool "node" "OpenJS.NodeJS.LTS" "Node.js"
$nodeVersion = [version]((node -v).TrimStart("v"))
if ($nodeVersion -lt [version]"20.19.0") {
  Say "Actualizando Node.js (tenias la version $nodeVersion)..."
  winget upgrade --id OpenJS.NodeJS.LTS -e --accept-source-agreements --accept-package-agreements --silent
  Refresh-Path
}

# Chrome: Claude uses it (Chrome DevTools MCP) to open and check the site
$chromePaths = @("$env:ProgramFiles\Google\Chrome\Application\chrome.exe", "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe", "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe")
if ($chromePaths | Where-Object { Test-Path $_ }) { Ok "Google Chrome ya estaba instalado" }
else {
  Say "Instalando Google Chrome..."
  winget install --id Google.Chrome -e --accept-source-agreements --accept-package-agreements --silent
  Ok "Google Chrome instalado"
}

# 2. Project folder --------------------------------------------------------
if (-not $Path) {
  $legacy = Join-Path $HOME "Desktop\CTS\ctennisstudio"
  $Path = if (Test-Path (Join-Path $legacy ".git")) { $legacy } else { Join-Path $HOME "Documents\ctennisstudio" }
}
if (Test-Path (Join-Path $Path ".git")) {
  Say "El proyecto ya existe en $Path, lo actualizo..."
  cmd /c "git -C `"$Path`" pull --rebase origin main"
  if ($LASTEXITCODE -ne 0) { throw "No pude actualizar el proyecto (hay cambios sin publicar?). Claude te ayuda a resolverlo." }
} else {
  Say "Descargando la pagina web en $Path..."
  New-Item -ItemType Directory -Force (Split-Path $Path) | Out-Null
  cmd /c "git clone $RepoUrl `"$Path`""
  if ($LASTEXITCODE -ne 0) { throw "No pude descargar el proyecto. Revisa la conexion a internet." }
}
Ok "Proyecto en $Path"

# 3. Git identity (only for this project) ---------------------------------
# Set locally so commits are signed as Pablo even if the PC has another global identity
if (-not (git -C $Path config --local user.email)) {
  $email = "$GitHubUser@users.noreply.github.com"
  try {
    $id = (Invoke-RestMethod "https://api.github.com/users/$GitHubUser").id
    $email = "$id+$GitHubUser@users.noreply.github.com"
  } catch { }
  git -C $Path config --local user.name $GitName
  git -C $Path config --local user.email $email
}
git -C $Path config pull.rebase true
Ok "Firma de cambios: $(git -C $Path config user.name) <$(git -C $Path config user.email)>"

# 4. Dependencies ----------------------------------------------------------
Say "Instalando lo que necesita la pagina (1-2 minutos)..."
Push-Location $Path
try { npm ci --no-audit --no-fund } finally { Pop-Location }
Ok "Dependencias instaladas"

# 5. Claude memory: remember where the project is --------------------------
$claudeDir = Join-Path $HOME ".claude"
$memory = Join-Path $claudeDir "CLAUDE.md"
New-Item -ItemType Directory -Force $claudeDir | Out-Null
$start = "<!-- ctennisstudio:start -->"
$end = "<!-- ctennisstudio:end -->"
$block = @"
$start
## Pablo's website (ctenisstudio.com)

I'm Pablo Garibotto. I'm not technical: talk to me in Spanish, in simple words.
My website project is in: ``$Path``
(GitHub: $RepoUrl - I push as ``$GitHubUser``; pushing to main publishes it via Vercel.)

Whenever I ask to work on my website/page/web ("mi pagina", "la web", fotos, torneos, publicar, probar...):
work inside that folder and follow its CLAUDE.md. If the folder doesn't exist, set it up again following
https://raw.githubusercontent.com/EzequielGaribotto/ctennisstudio/main/docs/INSTALACION.md
$end
"@
$current = if (Test-Path $memory) { Get-Content $memory -Raw -Encoding UTF8 } else { "" }
if ($current -match [regex]::Escape($start)) {
  $pattern = [regex]::Escape($start) + "[\s\S]*?" + [regex]::Escape($end)
  $current = [regex]::Replace($current, $pattern, $block.Replace('$', '$$'))
} else {
  $current = ($current.TrimEnd() + "`r`n`r`n" + $block).TrimStart()
}
[IO.File]::WriteAllText($memory, $current + "`r`n", (New-Object System.Text.UTF8Encoding $false))
Ok "Claude ya sabe donde esta tu pagina ($memory)"

# 6. GitHub sign-in check ----------------------------------------------------
Say "Comprobando el acceso a GitHub (si se abre una ventana, inicia sesion como $GitHubUser)..."
# Windows PowerShell 5.1 turns git's normal stderr output into errors; run it through cmd instead
cmd /c "git -C `"$Path`" push --dry-run origin HEAD:main >nul 2>nul"
if ($LASTEXITCODE -eq 0) { Ok "Acceso a GitHub correcto: vas a poder publicar" }
else { Write-Host "    ATENCION: no se pudo confirmar el acceso a GitHub. Claude te va a ayudar con esto." -ForegroundColor Yellow }

Write-Host ""
Write-Host "LISTO. Abri la carpeta $Path en Visual Studio Code y habla con Claude." -ForegroundColor Green
