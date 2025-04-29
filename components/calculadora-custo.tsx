"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { carrosData } from "@/lib/carros-data"

export function CalculadoraCusto() {
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
    distribuicaoCustos: {
      combustivel: number
      seguro: number
      ipva: number
      licenciamento: number
      manutencao: number
      depreciacao: number
      outros: number
    }
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
      distribuicaoCustos: {
        combustivel: custoCombustivel,
        seguro: valores.valorSeguro,
        ipva: valores.valorIPVA,
        licenciamento: valores.valorLicenciamento,
        manutencao: valores.valorManutencao,
        depreciacao: valores.valorDepreciacao,
        outros: valores.outrosCustos,
      },
    })
  }

  const formatarValor = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <section id="calculadora" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Calculadora de Custos</h2>
        <div className="max-w-4xl mx-auto">
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
                    {Object.entries(carrosData).map(([key, carro]) => (
                      <SelectItem key={key} value={key}>
                        {carro.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-700">Dados do Veículo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
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
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-700">Custos Fixos Anuais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
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
            </Card>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={calcularCustoAnual}
              size="lg"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg"
            >
              Calcular Custo Anual
            </Button>
          </div>

          {resultados && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white shadow-sm border-t-4 border-t-green-500">
                <CardHeader>
                  <CardTitle className="text-gray-700">Custo com Combustível</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{formatarValor(resultados.custoCombustivel)}</div>
                  <p className="text-gray-500 mt-2">por ano</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-t-4 border-t-blue-500">
                <CardHeader>
                  <CardTitle className="text-gray-700">Custo Total Anual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{formatarValor(resultados.custoTotal)}</div>
                  <p className="text-gray-500 mt-2">todos os custos incluídos</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
