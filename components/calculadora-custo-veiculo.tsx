"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados dos 10 carros mais vendidos no Brasil em 2024
const carrosData = {
  "fiat-strada": {
    nome: "Fiat Strada",
    valor: 107990,
    consumo: 11.3,
    seguro: 3200,
  },
  "volkswagen-polo": {
    nome: "Volkswagen Polo",
    valor: 89990,
    consumo: 13.2,
    seguro: 2800,
  },
  "chevrolet-onix": {
    nome: "Chevrolet Onix",
    valor: 84990,
    consumo: 13.0,
    seguro: 2600,
  },
  "hyundai-hb20": {
    nome: "Hyundai HB20",
    valor: 82990,
    consumo: 13.5,
    seguro: 2500,
  },
  "fiat-argo": {
    nome: "Fiat Argo",
    valor: 79990,
    consumo: 12.8,
    seguro: 2400,
  },
  "volkswagen-t-cross": {
    nome: "Volkswagen T-Cross",
    valor: 142990,
    consumo: 11.2,
    seguro: 4200,
  },
  "chevrolet-tracker": {
    nome: "Chevrolet Tracker",
    valor: 129990,
    consumo: 11.9,
    seguro: 3900,
  },
  "hyundai-creta": {
    nome: "Hyundai Creta",
    valor: 122990,
    consumo: 11.7,
    seguro: 3700,
  },
  "fiat-mobi": {
    nome: "Fiat Mobi",
    valor: 68990,
    consumo: 14.3,
    seguro: 2100,
  },
  "nissan-kicks": {
    nome: "Nissan Kicks",
    valor: 119990,
    consumo: 12.5,
    seguro: 3600,
  },
}

export function CalculadoraCustoVeiculo() {
  const [carroSelecionado, setCarroSelecionado] = useState<string>("")
  const [formData, setFormData] = useState({
    valorCarro: "",
    consumoMedio: "",
    valorSeguro: "",
    precoGasolina: "5.89", // Valor padrão
    quilometragemMes: "1000", // Valor padrão
    valorIPVA: "",
    valorLicenciamento: "",
    valorManutencao: "",
    valorDepreciacao: "",
    outrosCustos: "",
  })

  const [resultados, setResultados] = useState<{
    custoCombustivel: number
    custoTotal: number
  } | null>(null)

  // Atualiza os campos quando um carro é selecionado
  useEffect(() => {
    if (carroSelecionado) {
      const carro = carrosData[carroSelecionado as keyof typeof carrosData]
      setFormData((prev) => ({
        ...prev,
        valorCarro: carro.valor.toString(),
        consumoMedio: carro.consumo.toString(),
        valorSeguro: carro.seguro.toString(),
        // Calcula IPVA padrão (4% do valor do carro)
        valorIPVA: (carro.valor * 0.04).toFixed(2),
        // Valor padrão para licenciamento
        valorLicenciamento: "98.91",
        // Estimativa de manutenção anual (2% do valor do carro)
        valorManutencao: (carro.valor * 0.02).toFixed(2),
        // Estimativa de depreciação anual (10% do valor do carro)
        valorDepreciacao: (carro.valor * 0.1).toFixed(2),
        outrosCustos: "0",
      }))
    }
  }, [carroSelecionado])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Aceita apenas números e ponto decimal
    const numericValue = value.replace(/[^0-9.]/g, "")
    setFormData({
      ...formData,
      [name]: numericValue,
    })
  }

  const calcularCustoAnual = () => {
    // Converter strings para números
    const valores = {
      valorCarro: Number.parseFloat(formData.valorCarro) || 0,
      consumoMedio: Number.parseFloat(formData.consumoMedio) || 1, // Evitar divisão por zero
      precoGasolina: Number.parseFloat(formData.precoGasolina) || 0,
      quilometragemMes: Number.parseFloat(formData.quilometragemMes) || 0,
      valorSeguro: Number.parseFloat(formData.valorSeguro) || 0,
      valorIPVA: Number.parseFloat(formData.valorIPVA) || 0,
      valorLicenciamento: Number.parseFloat(formData.valorLicenciamento) || 0,
      valorManutencao: Number.parseFloat(formData.valorManutencao) || 0,
      valorDepreciacao: Number.parseFloat(formData.valorDepreciacao) || 0,
      outrosCustos: Number.parseFloat(formData.outrosCustos) || 0,
    }

    // Cálculos conforme as regras
    const quilometragemAnual = valores.quilometragemMes * 12
    const litrosConsumidos = quilometragemAnual / valores.consumoMedio
    const custoCombustivel = litrosConsumidos * valores.precoGasolina

    const custoTotal =
      custoCombustivel +
      valores.valorSeguro +
      valores.valorIPVA +
      valores.valorLicenciamento +
      valores.valorManutencao +
      valores.valorDepreciacao +
      valores.outrosCustos

    setResultados({
      custoCombustivel,
      custoTotal,
    })
  }

  const formatarValor = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white shadow-sm mb-8">
        <CardHeader>
          <CardTitle className="text-gray-700">Selecione o Veículo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="carro" className="text-gray-600">
              Modelo do Carro
            </Label>
            <Select onValueChange={setCarroSelecionado} value={carroSelecionado}>
              <SelectTrigger className="border-gray-200">
                <SelectValue placeholder="Selecione um modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fiat-strada">Fiat Strada</SelectItem>
                <SelectItem value="volkswagen-polo">Volkswagen Polo</SelectItem>
                <SelectItem value="chevrolet-onix">Chevrolet Onix</SelectItem>
                <SelectItem value="hyundai-hb20">Hyundai HB20</SelectItem>
                <SelectItem value="fiat-argo">Fiat Argo</SelectItem>
                <SelectItem value="volkswagen-t-cross">Volkswagen T-Cross</SelectItem>
                <SelectItem value="chevrolet-tracker">Chevrolet Tracker</SelectItem>
                <SelectItem value="hyundai-creta">Hyundai Creta</SelectItem>
                <SelectItem value="fiat-mobi">Fiat Mobi</SelectItem>
                <SelectItem value="nissan-kicks">Nissan Kicks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-700">Dados do Veículo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="valorCarro" className="text-gray-600">
                Valor do carro (R$)
              </Label>
              <Input
                id="valorCarro"
                name="valorCarro"
                placeholder="0,00"
                value={formData.valorCarro}
                onChange={handleInputChange}
                className="border-gray-200"
                readOnly={!!carroSelecionado}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consumoMedio" className="text-gray-600">
                Consumo médio (km/l)
              </Label>
              <Input
                id="consumoMedio"
                name="consumoMedio"
                placeholder="0,0"
                value={formData.consumoMedio}
                onChange={handleInputChange}
                className="border-gray-200"
                readOnly={!!carroSelecionado}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valorSeguro" className="text-gray-600">
                Seguro anual (R$)
              </Label>
              <Input
                id="valorSeguro"
                name="valorSeguro"
                placeholder="0,00"
                value={formData.valorSeguro}
                onChange={handleInputChange}
                className="border-gray-200"
                readOnly={!!carroSelecionado}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precoGasolina" className="text-gray-600">
                Preço da gasolina (R$/litro)
              </Label>
              <Input
                id="precoGasolina"
                name="precoGasolina"
                placeholder="0,00"
                value={formData.precoGasolina}
                onChange={handleInputChange}
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quilometragemMes" className="text-gray-600">
                Quilometragem rodada por mês (km)
              </Label>
              <Input
                id="quilometragemMes"
                name="quilometragemMes"
                placeholder="0"
                value={formData.quilometragemMes}
                onChange={handleInputChange}
                className="border-gray-200"
              />
            </div>
          </div>

          <Separator className="my-6" />
          <h3 className="text-gray-700 font-medium mb-4">Custos Fixos Anuais</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="valorIPVA" className="text-gray-600">
                IPVA anual (R$)
              </Label>
              <Input
                id="valorIPVA"
                name="valorIPVA"
                placeholder="0,00"
                value={formData.valorIPVA}
                onChange={handleInputChange}
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valorLicenciamento" className="text-gray-600">
                Licenciamento anual (R$)
              </Label>
              <Input
                id="valorLicenciamento"
                name="valorLicenciamento"
                placeholder="0,00"
                value={formData.valorLicenciamento}
                onChange={handleInputChange}
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valorManutencao" className="text-gray-600">
                Manutenção anual (R$)
              </Label>
              <Input
                id="valorManutencao"
                name="valorManutencao"
                placeholder="0,00"
                value={formData.valorManutencao}
                onChange={handleInputChange}
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valorDepreciacao" className="text-gray-600">
                Depreciação anual (R$)
              </Label>
              <Input
                id="valorDepreciacao"
                name="valorDepreciacao"
                placeholder="0,00"
                value={formData.valorDepreciacao}
                onChange={handleInputChange}
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="outrosCustos" className="text-gray-600">
                Outros custos anuais (R$)
              </Label>
              <Input
                id="outrosCustos"
                name="outrosCustos"
                placeholder="0,00"
                value={formData.outrosCustos}
                onChange={handleInputChange}
                className="border-gray-200"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <Button onClick={calcularCustoAnual} className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-8">
            Calcular custo anual
          </Button>
        </CardFooter>
      </Card>

      {resultados && (
        <Card className="mt-8 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700">Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Custo com combustível por ano:</span>
                <span className="text-gray-800 font-medium">{formatarValor(resultados.custoCombustivel)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Custo anual total:</span>
                <span className="text-gray-900 font-bold text-xl">{formatarValor(resultados.custoTotal)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
