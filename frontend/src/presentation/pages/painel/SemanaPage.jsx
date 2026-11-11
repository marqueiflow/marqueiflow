// AG-03 — Semana (só a tela; dados de exemplo do Figma)
// As setas trocam entre 3 semanas de exemplo: a anterior, a atual e a próxima.
// Tocar num dia abre a agenda dele (AG-04); hoje abre a Agenda de hoje.
import { useState } from "react";
import { PainelLayout } from "@/presentation/components/painel/PainelLayout";
import { VisaoAgenda } from "@/presentation/components/agenda/VisaoAgenda";
import { SemanaDias } from "@/presentation/components/agenda/SemanaDias";
import { SEMANAS } from "@/presentation/components/agenda/semanasExemplo";
import { IconButton } from "@/presentation/components/ui/IconButton";
import setaEsquerda from "@/presentation/assets/icons/seta-esquerda-16.svg";
import setaDireita from "@/presentation/assets/icons/seta-direita-16.svg";

const ATUAL = 1;

export default function SemanaPage() {
  const [indice, setIndice] = useState(ATUAL);
  const semana = SEMANAS[indice];

  return (
    <PainelLayout aba="agenda" className="gap-4.5">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] font-medium text-ink-2" aria-live="polite">
            {semana.periodo}
          </p>
          <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.96px] text-ink">
            Semana
          </h1>
        </div>
        <div className="flex gap-2">
          <IconButton
            icon={setaEsquerda}
            iconSize={16}
            label="Semana anterior"
            onClick={() => setIndice((i) => i - 1)}
            disabled={indice === 0}
            className="size-9 before:-inset-1"
          />
          <IconButton
            icon={setaDireita}
            iconSize={16}
            label="Próxima semana"
            onClick={() => setIndice((i) => i + 1)}
            disabled={indice === SEMANAS.length - 1}
            className="size-9 before:-inset-1"
          />
        </div>
      </header>

      <VisaoAgenda ativa="semana" />

      <p className="text-sm text-ink-2">{semana.resumo}</p>

      <SemanaDias dias={semana.dias} />
    </PainelLayout>
  );
}
