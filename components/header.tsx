"use client"

import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToCalculator = () => {
    const calculatorElement = document.getElementById("calculadora")
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-gray-700" />
          <h1 className="text-xl font-medium text-gray-800">Calculadora de Custo Anual de Carro</h1>
        </div>
        <Button onClick={scrollToCalculator} className="bg-gray-800 hover:bg-gray-700">
          Calcule agora
        </Button>
      </div>
    </header>
  )
}
