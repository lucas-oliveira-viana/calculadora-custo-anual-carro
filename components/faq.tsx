import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function Faq() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Perguntas Frequentes</h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Qual a média de IPVA em 2025?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  O IPVA varia de estado para estado, mas em média representa cerca de 3% a 4% do valor do veículo. Em
                  2025, alguns estados implementaram pequenas reduções nas alíquotas para incentivar a renovação da
                  frota. Veículos elétricos e híbridos geralmente têm alíquotas reduzidas ou isenções em alguns estados.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Como o valor do seguro pode variar?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">O valor do seguro é influenciado por diversos fatores, como:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                  <li>Perfil do motorista (idade, tempo de habilitação)</li>
                  <li>Histórico de sinistros</li>
                  <li>Região onde o veículo circula e é guardado</li>
                  <li>Modelo e ano do veículo</li>
                  <li>Coberturas contratadas (básica, completa, terceiros)</li>
                  <li>Valor de mercado do veículo</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  Comparar cotações entre diferentes seguradoras pode resultar em economias significativas.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Por que considerar a depreciação no cálculo?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  A depreciação é um custo real, embora não seja um desembolso direto. Ela representa quanto do valor do
                  seu investimento no veículo você perde a cada ano. Considerar a depreciação ajuda a ter uma visão mais
                  precisa do custo total de propriedade e pode influenciar decisões como o momento ideal para vender o
                  veículo ou trocar por um novo modelo.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Como economizar combustível no dia a dia?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">Existem várias estratégias para economizar combustível:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                  <li>Mantenha a velocidade constante em viagens</li>
                  <li>Evite acelerações e frenagens bruscas</li>
                  <li>Mantenha os pneus calibrados corretamente</li>
                  <li>Faça a manutenção preventiva regularmente</li>
                  <li>Não carregue peso desnecessário no veículo</li>
                  <li>Use o ar-condicionado de forma consciente</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Qual a vida útil média de um carro no Brasil?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  A vida útil média de um carro no Brasil é de aproximadamente 15 a 20 anos. No entanto, fatores como
                  manutenção adequada, condições de uso e qualidade do veículo podem estender ou reduzir
                  significativamente essa média. Veículos bem mantidos podem durar muito mais tempo com bom desempenho e
                  segurança.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
