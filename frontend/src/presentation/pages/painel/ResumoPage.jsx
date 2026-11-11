// RES-01 — Resumo do mês (só a tela; dados de exemplo do Figma)
// As setas trocam entre 3 meses de exemplo; novembro (o atual) é o último, então a seta da direita
// fica apagada nele. No gráfico, tocar numa barra mostra o número daquele dia.
import { Fragment, useState } from "react";
import { cn } from "@/presentation/utils/cn";
import { PainelLayout } from "@/presentation/components/painel/PainelLayout";
import { DiasMaisCheios } from "@/presentation/components/resumo/DiasMaisCheios";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { ListRow } from "@/presentation/components/ui/ListRow";
import setaEsquerda from "@/presentation/assets/icons/seta-esquerda-16.svg";
import setaDireita from "@/presentation/assets/icons/seta-direita-16.svg";

// Exemplo até existir back-end.
const MESES = [
  {
    nome: "Setembro",
    rotulo: "Faturado no mês",
    valor: "R$ 4.010",
    comparacao: { texto: "+3%", positivo: true, resto: "em relação a agosto" },
    numeros: ["88", "6%", "R$ 46"],
    dias: [30, 26, 34, 40, 58, 84, 10],
    destaque: { valor: 24, lider: "Sábado lidera" },
    maisVendidos: [
      { id: "corte-barba", nome: "Corte + barba", vezes: "38 vezes", total: "R$ 2.280" },
      { id: "corte", nome: "Corte", vezes: "29 vezes", total: "R$ 1.160" },
    ],
  },
  {
    nome: "Outubro",
    rotulo: "Faturado no mês",
    valor: "R$ 3.820",
    comparacao: { texto: "−5%", positivo: false, resto: "em relação a setembro" },
    numeros: ["84", "7%", "R$ 45"],
    dias: [34, 31, 36, 42, 61, 84, 12],
    destaque: { valor: 22, lider: "Sábado lidera" },
    maisVendidos: [
      { id: "corte-barba", nome: "Corte + barba", vezes: "35 vezes", total: "R$ 2.100" },
      { id: "corte", nome: "Corte", vezes: "30 vezes", total: "R$ 1.200" },
    ],
  },
  {
    nome: "Novembro",
    rotulo: "Faturado até hoje",
    valor: "R$ 4.280",
    comparacao: { texto: "+12%", positivo: true, resto: "em relação a outubro, no mesmo dia" },
    numeros: ["96", "4%", "R$ 44"],
    dias: [36, 29, 39, 45, 65, 84, 13],
    destaque: { valor: 26, lider: "Sábado lidera" },
    maisVendidos: [
      { id: "corte-barba", nome: "Corte + barba", vezes: "42 vezes", total: "R$ 2.520" },
      { id: "corte", nome: "Corte", vezes: "31 vezes", total: "R$ 1.240" },
    ],
  },
];

const ROTULOS_NUMEROS = ["atendimentos", "de faltas", "ticket médio"];
const DIAS_SEMANA = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export default function ResumoPage() {
  const [indice, setIndice] = useState(MESES.length - 1);
  const mes = MESES[indice];
  const dias = mes.dias.map((altura, i) => ({
    id: DIAS_SEMANA[i],
    label: DIAS_SEMANA[i],
    altura,
    // Exemplo: o número de cada dia acompanha a altura da barra (a do sábado é a mais alta).
    valor: Math.round((altura / Math.max(...mes.dias)) * mes.destaque.valor),
    destaque: i === 5,
  }));

  return (
    <PainelLayout aba="resumo" className="gap-5.5 pt-5">
      <header className="flex items-end justify-between">
        <h1
          className="text-[32px] leading-[1.1] font-semibold tracking-[-0.96px] text-ink"
          aria-live="polite"
        >
          {mes.nome}
        </h1>
        <div className="flex gap-2">
          <IconButton
            icon={setaEsquerda}
            iconSize={16}
            label="Mês anterior"
            onClick={() => setIndice((i) => i - 1)}
            disabled={indice === 0}
            className="size-9 before:-inset-1"
          />
          <IconButton
            icon={setaDireita}
            iconSize={16}
            label="Próximo mês"
            onClick={() => setIndice((i) => i + 1)}
            disabled={indice === MESES.length - 1}
            className="size-9 before:-inset-1"
          />
        </div>
      </header>

      <section className="flex flex-col gap-1.5 leading-[normal]">
        <p className="text-sm font-medium text-ink-2">{mes.rotulo}</p>
        <p className="text-[48px] leading-[1.05] font-semibold tracking-[-1.92px] text-ink tabular-nums">
          {mes.valor}
        </p>
        <p className="flex gap-1.5 text-sm">
          <span
            className={cn(
              "font-semibold",
              mes.comparacao.positivo ? "text-success" : "text-danger",
            )}
          >
            {mes.comparacao.texto}
          </span>
          <span className="text-ink-2">{mes.comparacao.resto}</span>
        </p>
      </section>

      <section className="flex rounded-2xl border border-line bg-surface leading-[normal]">
        {mes.numeros.map((valor, i) => (
          <Fragment key={ROTULOS_NUMEROS[i]}>
            {i > 0 && <div className="w-px self-stretch bg-line" aria-hidden="true" />}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 py-3.5 pr-3 pl-4">
              <p className="text-[22px] font-semibold tracking-[-0.44px] text-ink tabular-nums">
                {valor}
              </p>
              <p className="text-[13px] text-ink-2">{ROTULOS_NUMEROS[i]}</p>
            </div>
          </Fragment>
        ))}
      </section>

      <section className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between leading-[normal]">
          <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">
            Dias mais cheios
          </h2>
          <p className="text-sm font-medium text-ink-2">{mes.destaque.lider}</p>
        </div>
        <DiasMaisCheios key={mes.nome} dias={dias} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-[17px] leading-[normal] font-semibold tracking-[-0.17px] text-ink">
          Mais vendidos
        </h2>
        <ListGroup inset className="leading-[normal]">
          {mes.maisVendidos.map((s) => (
            <ListRow
              key={s.id}
              size="md"
              rowClassName="py-[13px]"
              title={s.nome}
              description={s.vezes}
              trailing={s.total}
            />
          ))}
        </ListGroup>
      </section>
    </PainelLayout>
  );
}
