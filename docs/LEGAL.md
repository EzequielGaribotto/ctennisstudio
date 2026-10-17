# Legal status of the website (Spain / EU)

Informational, **not legal advice**. The base texts in `src/data/legal-content.ts` should be reviewed by a gestor/abogado
before relying on them. The AEPD offers a free tool for freelancers and small businesses: **Facilita RGPD**.

## What exists

| Item | Where | State |
|---|---|---|
| Aviso legal (LSSI art. 10) | `/aviso-legal` | Built (es/en), **off until owner data is complete** |
| Política de privacidad (RGPD arts. 13–14, LOPDGDD art. 11) | `/privacidad` | Built (es/en), **off until owner data is complete** |
| Política de cookies / almacenamiento | `/cookies` | Built (es/en), **off until owner data is complete** |
| Privacy notice + required checkbox on the contact form (server also checks it) | `ContactForm.tsx`, `route.ts` | Built, **off until owner data is complete** |
| Footer links to the three pages | `Footer.tsx` | Built, **off until owner data is complete** |
| Trademark disclaimer under the tournaments | `ExperienciaSection.tsx` | **Live** |
| Flags served from our own domain (no outside CDN) | `public/images/flags/`, `<Flag>` | **Live** |
| Google Maps only on click, with a cookie notice | `LocationSection.tsx` | **Live** |
| Unused tournament logos kept out of the published site | `assets-reserva/` | **Live** |

### How the pages are switched on
`src/data/legal.ts` → `LEGAL_READY` is true only when `taxId` is filled **and** `confirmedByOwner: true`. Until then the three URLs
return 404, the footer shows no legal links and the form has no checkbox, so nothing is ever published with missing or guessed data.
`npm run pendientes` lists what is missing; Claude asks Pablo for it at the start of his next session (see CLAUDE.md).

Needed from Pablo: NIF/DNI (or CIF), full legal name as registered, confirmation that the address is his professional address,
and whether he is autónomo or a company. His NIF will be public in the aviso legal (required for business sites).

## Third parties that touch visitors' data (keep the privacy/cookie texts in sync)

| Service | When | Data | Mentioned in |
|---|---|---|---|
| Vercel (hosting) | Every visit | IP, request logs | privacy, cookies |
| Resend (email) | Form submission | Name, email, phone, message | privacy |
| Microsoft Outlook/Hotmail (Pablo's mailbox) | Form submission | Same | privacy |
| Cloudflare Turnstile | Form page (once keys are set) | Technical/browser data for the check | privacy, cookies |
| Google Maps | Only if the visitor clicks "Mostrar mapa" | IP, Google cookies | privacy, cookies |
| WhatsApp / social links | Only if the visitor clicks out | Handled by those services | aviso legal, privacy |

No analytics, no advertising, no newsletter. If any is added: update the texts **and** add a consent banner that blocks it until accepted.

## Still to review with a gestor/abogado / with Pablo

- Final wording of the three texts; whether the "Titular" block fits his situation (autónomo vs sociedad).
- **Tournament trademarks** (ATP, WTA, ITF, Rolex Monte-Carlo Masters, Mutua Madrid Open, Miami Open…): shown with a disclaimer;
  some owners restrict commercial use of logos/images. Ask whether permissions/accreditation terms exist. Reserve logos
  (Roland Garros, Wimbledon, US Open, Australian Open, WTT…) stay in `assets-reserva/` (the GitHub repo is public, so they are
  still visible there).
- **Photos**: identifiable people (image rights, LO 1/1982 + RGPD) and who took each photo (copyright).
- **Video** has an audio track: check there is no music with rights.
- **"Encordador oficial"** claims: must be true and provable (unfair competition / misleading advertising).
- **Catalan**: the Código de Consumo de Cataluña (Ley 22/2010) has language-rights rules for businesses serving consumers in
  Catalonia; check with the gestor whether a Catalan version is required. Today: Spanish and English.
- **Accessibility law (EAA)**: likely out of scope (microenterprise, no online sales); the site already scores 100 in Lighthouse accessibility.
- **Prices / online sales**: none today. If they come back: terms of sale, withdrawal right, VAT information.
