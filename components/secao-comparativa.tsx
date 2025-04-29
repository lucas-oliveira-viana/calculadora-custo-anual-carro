import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Fuel, Coins, MapIcon as City, RouteIcon as Road } from "lucide-react"
import { carrosData } from "@/lib/carros-data"

export function SecaoComparativa() {
  // Encontrar o carro mais econômico (maior consumo)
  const maisEconomico = Object.entries(carrosData).reduce(
    (prev, [key, carro]) => {
      return carro.consumo > prev.consumo ? { id: key, consumo: carro.consumo } : prev
    },
    { id: "", consumo: 0 },
  )

  // Encontrar o carro com menor custo anual estimado
  const menorCusto = Object.entries(carrosData).reduce(
    (prev, [key, carro]) => {
      const custoEstimado = carro.custoEstimadoAnual
      return custoEstimado < prev.custo ? { id: key, custo: custoEstimado } : prev
    },
    { id: "", custo: Number.POSITIVE_INFINITY },
  )

  // Encontrar o melhor para cidade (baseado em uma propriedade fictícia)
  const melhorCidade = "fiat-mobi" // Exemplo fixo para demonstração

  // Encontrar o melhor para estrada (baseado em uma propriedade fictícia)
  const melhorEstrada = "volkswagen-polo" // Exemplo fixo para demonstração

  const formatarValor = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">Comparativo de Veículos</h2>

        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle>Os 10 carros mais vendidos em 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Consumo Médio (km/l)</TableHead>
                    <TableHead>Custo Anual Estimado</TableHead>
                    <TableHead>Destaques</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(carrosData).map(([key, carro]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{carro.nome}</TableCell>
                      <TableCell>{carro.consumo.toFixed(1)}</TableCell>
                      <TableCell>{formatarValor(carro.custoEstimadoAnual)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {key === maisEconomico.id && (
                            <Badge className="flex items-center gap-1 bg-green-500">
                              <Fuel className="h-3 w-3" /> Mais econômico
                            </Badge>
                          )}
                          {key === menorCusto.id && (
                            <Badge className="flex items-center gap-1 bg-blue-500">
                              <Coins className="h-3 w-3" /> Menor custo anual
                            </Badge>
                          )}
                          {key === melhorCidade && (
                            <Badge className="flex items-center gap-1 bg-amber-500">
                              <City className="h-3 w-3" /> Melhor para cidade
                            </Badge>
                          )}
                          {key === melhorEstrada && (
                            <Badge className="flex items-center gap-1 bg-purple-500">
                              <Road className="h-3 w-3" /> Melhor para estrada
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
