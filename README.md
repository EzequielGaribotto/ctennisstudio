# CTennis Studio — ctenisstudio.com

Website of Pablo Garibotto, professional tennis stringer. Next.js 15 + React 19, deployed on **Vercel**
(every push to `main` goes live automatically).

- **Pablo:** everything is done by talking to Claude. First-time setup: [docs/INSTALACION.md](docs/INSTALACION.md).
- **Claude / developers:** read [CLAUDE.md](CLAUDE.md) (project map, workflows, rules). Skills in
  [.claude/skills/](.claude/skills/): `probar`, `publicar`, `fotos`. Chrome DevTools MCP in [.mcp.json](.mcp.json).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local site at http://localhost:3000 |
| `npm run build` | Lint + photo verification + type check + production build |
| `npm run fotos` | Tournament photo status; `revisar`, `agregar`, `descartar`, `recuperar`, `manifiesto`, `optimizar`, `verificar` |
| `npm run imagen -- <src> <dest.webp>` | Any other image → optimized WebP (`--quitar-fondo`, `--max N`) |
| `npm run favicons` | Regenerate site icons from the logo |
| `npm run celular` | QR code to open the dev server on a phone (same Wi-Fi) |
| `npm run historial` | Readable list of recent changes (published or not) |

New photos/logos go in `fotos-nuevas/` (git-ignored). Data: `src/data/tournaments.json` (tournament cards),
`src/data/contact.ts` (phone, social links), `src/app/translations/` (all texts, es/en).

Contact form email uses Resend: `RESEND_API_KEY` must be set in the Vercel project.
