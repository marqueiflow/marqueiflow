import { cn } from "@/presentation/utils/cn";
const states = {
  livre: "horario-livre",
  selecionado: "horario-selecionado",
  indisponivel: "horario-indisponivel",
};
/**
 * Horário (Figma · Componentes base). O laranja marca o horário escolhido.
 * Sem `onSelect` vira só ilustração (não tocável).
 */
export function TimeSlot({ time, state = "livre", onSelect, className }) {
  const base = cn("horario", states[state], className);
  if (!onSelect) {
    return <span className={base}>{time}</span>;
  }
  return (
    <button
      type="button"
      className={cn("horario-botao", base)}
      onClick={onSelect}
      disabled={state === "indisponivel"}
      aria-pressed={state === "selecionado"}
    >
      {time}
    </button>
  );
}
