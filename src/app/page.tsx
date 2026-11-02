import Header from "@/components/header/Header"
import Footer from "@/components/section/footer/Footer"
import TennisHeroSection from "@/components/section/tennis/TennisHeroSection"
import ExperienciaSection from "@/components/section/tennis/ExperienciaSection"
import ServiciosSection from "@/components/section/tennis/ServiciosSection"
import GestionPreview from "@/components/section/tennis/GestionPreview"
import CursosSection from "@/components/section/tennis/CursosSection"
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton"

export default function Page() {

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <TennisHeroSection />
        <ExperienciaSection />
        <ServiciosSection />
        <GestionPreview variant="home" />
        <CursosSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
