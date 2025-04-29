"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const scrollToCalculator = () => {
    const calculatorElement = document.getElementById("calculadora")
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center blur-[2px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop')",
        }}
      ></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-2xl text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Descubra quanto custa manter seu carro por ano.
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Considere combustível, seguro, IPVA, manutenção e depreciação em poucos cliques.
          </p>
          <Button
            onClick={scrollToCalculator}
            size="lg"
            className="bg-white text-gray-800 hover:bg-gray-200 flex items-center gap-2"
          >
            Calcular agora <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
