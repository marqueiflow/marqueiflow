import { cn } from "@/presentation/utils/cn";

/**
 * Faixa de dias que rola para o lado. O dia escolhido fica preto.
 * dias: [{ id, semana, dia }].
 */
export function SeletorDias({ dias, value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Dia"
      className="-mx-5 flex [scrollbar-width:none] gap-2 overflow-x-auto px-5 leading-[normal]"
    >
      {dias.map((d) => {
        const escolhido = d.id === value;
        return (
          <button
            key={d.id}
            type="button"
            role="radio"
            aria-checked={escolhido}
            onClick={() => onChange(d.id)}
            className={cn(
              "flex h-18 w-16 shrink-0 pressable flex-col items-center justify-center gap-0.5 rounded-2xl",
              escolhido ? "bg-ink" : "border border-line bg-surface",
            )}
          >
            <span className={cn("text-xs font-medium", escolhido ? "text-ink-3" : "text-ink-2")}>
              {d.semana}
            </span>
            <span
              className={cn(
                "text-xl font-semibold tracking-[-0.4px] tabular-nums",
                escolhido ? "text-surface" : "text-ink",
              )}
            >
              {d.dia}
            </span>
          </button>
        );
      })}
    </div>
  );
}
