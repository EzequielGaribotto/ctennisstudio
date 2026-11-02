import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Header from "@/components/header/Header"
import Footer from "@/components/section/footer/Footer"
import BehindTheGameSection from "@/components/section/tennis/BehindTheGameSection"
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton"
import { BEHIND_THE_GAME_READY } from "@/data/behind-the-game"

export const metadata: Metadata = {
  title: "Behind the Game | CTS - Custom Tennis Studio",
  description: "Lo que no se ve desde la grada: el trabajo, el equipo y los momentos detrás de cada torneo.",
  alternates: { canonical: "/behind-the-game/" },
}

export default function BehindTheGamePage() {
  if (!BEHIND_THE_GAME_READY) notFound()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <BehindTheGameSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
