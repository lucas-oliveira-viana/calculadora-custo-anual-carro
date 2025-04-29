"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useTheme } from "next-themes"

export function InformacoesRelevantes() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Dados de exemplo para o gráfico
  const data = [
    { name: "Combustível", value: 35 },
    { name: "Seguro", value: 20 },
    { name: "IPVA", value: 15 },
    { name: "Manutenção", value: 12 },
    { name: "Depreciação", value: 15 },
    { name: "Outros", value: 3 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Informações Relevantes</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição Média de Custos</CardTitle>
              <CardDescription>Proporção típica dos gastos com um veículo</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Como calcular a depreciação?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A depreciação é a perda de valor do veículo ao longo do tempo. Em média, um carro novo perde cerca de
                  10-20% do seu valor no primeiro ano e continua a depreciar nos anos seguintes.
                </p>
                <p className="text-gray-600 mt-2">
                  Para calcular, considere o valor atual do seu carro e estime quanto ele valerá no próximo ano. A
                  diferença é o valor da depreciação anual.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dicas para economizar na manutenção</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Faça a manutenção preventiva regularmente</li>
                  <li>Verifique a pressão dos pneus mensalmente</li>
                  <li>Troque o óleo e filtros conforme recomendado pelo fabricante</li>
                  <li>Evite acelerações bruscas e frenagens intensas</li>
                  <li>Compare preços em diferentes oficinas antes de realizar serviços</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
