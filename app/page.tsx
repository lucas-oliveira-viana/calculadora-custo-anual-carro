import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CalculadoraCusto } from "@/components/calculadora-custo"
import { InformacoesRelevantes } from "@/components/informacoes-relevantes"
import { SecaoComparativa } from "@/components/secao-comparativa"
import { Faq } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <CalculadoraCusto />
        <InformacoesRelevantes />
        <SecaoComparativa />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
