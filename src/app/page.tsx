"use client"
import Header from "@/components/header/Header"
import Footer from "@/components/section/footer/Footer"
import TennisHeroSection from "@/components/section/tennis/TennisHeroSection"
import ExperienciaSection from "@/components/section/tennis/ExperienciaSection"
import EncordadoSection from "@/components/section/tennis/EncordadoSection"
import EquilibradoSection from "@/components/section/tennis/EquilibradoSection"
import CursosSection from "@/components/section/tennis/CursosSection"

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, background: 'transparent' }}>
        <TennisHeroSection />
        <ExperienciaSection />
        <EncordadoSection />
        <EquilibradoSection />
        <CursosSection />
      </main>
      <Footer />
    </div>
  )
}
