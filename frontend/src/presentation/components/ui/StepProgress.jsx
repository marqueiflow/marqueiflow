import { cn } from "@/presentation/utils/cn";
/** Barrinhas de progresso de um fluxo em passos. */
export function StepProgress({ current, total, className }) {
  return (
    <div
      className={cn("passos", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Passo ${current} de ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "passos-barra",
            i < current ? "passos-barra-feita" : "passos-barra-pendente",
          )}
        />
      ))}
    </div>
  );
}
