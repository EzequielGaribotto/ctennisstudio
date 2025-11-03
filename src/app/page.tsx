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
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
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
