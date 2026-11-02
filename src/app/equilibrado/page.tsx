import type { Metadata } from "next"
import Header from "@/components/header/Header"
import Footer from "@/components/section/footer/Footer"
import EquilibradoSection from "@/components/section/tennis/EquilibradoSection"
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton"

export const metadata: Metadata = {
  title: "Equilibrado y Reparación | CTS - Custom Tennis Studio",
  description: "Equilibrado de raquetas de tenis en tres niveles: POINT para el balance, SET para el peso y MATCH para igualar raquetas.",
  alternates: { canonical: "/equilibrado/" },
}

export default function EquilibradoPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <EquilibradoSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
