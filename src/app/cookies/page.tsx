import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LegalPage } from "@/components/legal/LegalPage"
import { LEGAL_READY } from "@/data/legal"

export const metadata: Metadata = {
  title: "Política de cookies | Custom Tennis Studio",
}

export default function Page() {
  // Stays off until the owner's data is complete and confirmed (see src/data/legal.ts)
  if (!LEGAL_READY) notFound()
  return <LegalPage doc="cookies" />
}
