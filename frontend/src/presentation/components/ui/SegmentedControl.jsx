import { cn } from "@/presentation/utils/cn";

/**
 * Controle segmentado: opções lado a lado num trilho cinza; a escolhida fica em branco.
 * options: [{ value, label, count? }]. count aparece menor, ao lado do rótulo.
 */
export function SegmentedControl({ label, options, value, onChange, className }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("flex gap-1 rounded-xl bg-line p-1 leading-[normal]", className)}
    >
      {options.map((opcao) => {
        const selecionada = opcao.value === value;
        return (
          <button
            key={opcao.value}
            type="button"
            role="radio"
            aria-checked={selecionada}
            onClick={() => onChange(opcao.value)}
            className={cn(
              "relative flex h-9 flex-1 pressable items-center justify-center gap-1.5 rounded-[9px]",
              "before:absolute before:inset-x-0 before:-inset-y-1",
              selecionada ? "bg-surface text-ink" : "text-ink-2",
            )}
          >
            <span className={cn("text-sm", selecionada ? "font-semibold" : "font-medium")}>
              {opcao.label}
            </span>
            {opcao.count != null && (
              <span className="text-[13px] font-medium text-ink-2 tabular-nums">{opcao.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
