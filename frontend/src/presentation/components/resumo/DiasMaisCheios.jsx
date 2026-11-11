import { useState } from "react";
import { cn } from "@/presentation/utils/cn";

/**
 * Gráfico de barras dos dias da semana.
 * dias: { id, label, altura (px, até 84), valor, destaque? }.
 * A barra escolhida fica laranja, com o rótulo em negrito e o valor em cima. Começa no dia com
 * destaque (o mais cheio); tocar em outra barra mostra o número daquele dia.
 * Para voltar ao dia com destaque (ex.: ao trocar de mês), mude a key.
 */
export function DiasMaisCheios({ dias }) {
  const [escolhido, setEscolhido] = useState(() => dias.find((d) => d.destaque)?.id);

  return (
    <div className="flex h-35 items-end gap-2.5 leading-[normal]">
      {dias.map((d) => {
        const ativo = d.id === escolhido;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => setEscolhido(d.id)}
            aria-pressed={ativo}
            aria-label={`${d.label}: ${d.valor} atendimentos`}
            className="group flex h-full min-w-0 flex-1 cursor-pointer flex-col items-center justify-end gap-1.5 rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {ativo && (
              <span className="text-xs font-semibold text-ink tabular-nums">{d.valor}</span>
            )}
            <span
              className={cn(
                "w-full rounded-t-md rounded-b-[2px] transition-colors",
                ativo ? "bg-accent" : "bg-line group-hover:bg-ink-3 group-active:bg-ink-3",
              )}
              style={{ height: d.altura }}
            />
            <span
              className={cn("text-xs", ativo ? "font-semibold text-ink" : "font-medium text-ink-2")}
            >
              {d.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
