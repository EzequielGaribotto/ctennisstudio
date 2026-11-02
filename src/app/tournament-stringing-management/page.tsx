import type { Metadata } from "next"
import Header from "@/components/header/Header"
import Footer from "@/components/section/footer/Footer"
import GestionTorneosSection from "@/components/section/tennis/GestionTorneosSection"
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton"

export const metadata: Metadata = {
  title: "Tournament Stringing Management | CTS - Custom Tennis Studio",
  description: "Gestión integral del servicio oficial de encordado para torneos ATP, WTA y competiciones internacionales, desde la planificación hasta la entrega de la última raqueta.",
  alternates: { canonical: "/tournament-stringing-management/" },
}

export default function TournamentStringingManagementPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <GestionTorneosSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
