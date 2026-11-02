import type { Metadata } from "next"
import Header from "@/components/header/Header"
import Footer from "@/components/section/footer/Footer"
import EncordadoSection from "@/components/section/tennis/EncordadoSection"
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton"

export const metadata: Metadata = {
  title: "Encordado Profesional | CTS - Custom Tennis Studio",
  description: "Encordado profesional de raquetas de tenis con las técnicas, métodos y máquinas del circuito ATP/WTA.",
  alternates: { canonical: "/encordado/" },
}

export default function EncordadoPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <EncordadoSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
