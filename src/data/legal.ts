import { CONTACT } from "./contact"
import { own } from "@/lib/own"

// Owner data shown in the Aviso legal / Política de privacidad / Política de cookies and next to the
// contact form. The legal pages and the form's privacy notice stay OFF (pages return 404, no footer
// links, no checkbox) until every field below is filled AND the owner confirmed them: we never publish
// legal texts with missing or guessed data.
//
// To turn them on: ask Pablo (see "Legal" in CLAUDE.md), fill `taxId`, check the other values with him,
// then set `confirmedByOwner: true`. `npm run pendientes` shows what is still missing.
export const LEGAL = {
  /** Full legal name of the owner as registered (confirmed by Pablo, autónomo) */
  holderName: "Pablo Garibotto" as string,
  tradeName: "Custom Tennis Studio (CTS)",
  /** NIF/NIE of the owner (autónomo) or CIF of the company */
  taxId: "X9776251D" as string,
  /** Professional address (confirmed by Pablo: same as the studio) */
  address: CONTACT.address,
  email: CONTACT.email,
  phone: CONTACT.phoneDisplay,
  website: "https://ctenisstudio.com",
  /** Set to true only after Pablo confirmed name, tax id and address */
  confirmedByOwner: true as boolean,
  /** Date of the texts in src/data/legal-content.ts (update when they change) */
  updated: "2026-10-18",
} as const

export const LEGAL_REQUIRED = ["holderName", "taxId", "address", "email", "phone"] as const

/** Fields still empty (for `npm run pendientes`) */
export const LEGAL_MISSING: string[] = LEGAL_REQUIRED.filter((key) => String(own(LEGAL as Record<string, unknown>, key) ?? "").trim() === "")

export const LEGAL_READY: boolean = LEGAL_MISSING.length === 0 && LEGAL.confirmedByOwner === true
