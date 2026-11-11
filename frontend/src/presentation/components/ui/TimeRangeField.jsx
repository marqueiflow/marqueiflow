import { cn } from "@/presentation/utils/cn";

/**
 * Faixa de horário editável em pílula: "09:00 – 19:00".
 * Cada hora é um campo de hora nativo (no celular abre o seletor do sistema).
 * invalid: mostra o texto em vermelho (ex.: fim antes do início).
 */
export function TimeRangeField({ label, start, end, onChange, invalid = false, className }) {
  const input = cn("intervalo-hora");

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("intervalo", invalid && "intervalo-invalido", className)}
    >
      <input
        type="time"
        step={900}
        aria-label={`${label}: início`}
        aria-invalid={invalid || undefined}
        className={input}
        value={start}
        onChange={(e) => onChange({ inicio: e.target.value, fim: end })}
      />
      <span aria-hidden="true">–</span>
      <input
        type="time"
        step={900}
        aria-label={`${label}: fim`}
        aria-invalid={invalid || undefined}
        className={input}
        value={end}
        onChange={(e) => onChange({ inicio: start, fim: e.target.value })}
      />
    </div>
  );
}
