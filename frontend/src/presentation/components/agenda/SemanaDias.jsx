import { Link } from "react-router";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { cn } from "@/presentation/utils/cn";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";

/**
 * Dias da semana com a ocupação de cada um.
 * dias: { id, semana, dia, ocupados, total, hoje?, aviso?, fechado? }.
 * Tocar no dia abre a agenda dele; o de hoje abre a Agenda de hoje.
 * aviso: texto em laranja (ex.: "Quase lotado"); a barra também fica laranja.
 */
export function SemanaDias({ dias }) {
  return (
    <ListGroup dividerClassName="pl-[72px]" className="leading-[normal]">
      {dias.map((d) => (
        <Link
          key={d.id}
          to={d.hoje ? "/painel" : `/painel/semana/${d.dia}`}
          className="flex pressable items-center gap-3.5 py-3 pr-3 pl-3.5 active:scale-100 active:bg-paper"
        >
          <span
            className={cn(
              "flex h-12 w-11 shrink-0 flex-col items-center justify-center rounded-xl",
              d.hoje ? "bg-ink" : "bg-paper",
            )}
          >
            <span className={cn("text-[11px] font-medium", d.hoje ? "text-ink-3" : "text-ink-2")}>
              {d.semana}
            </span>
            <span
              className={cn(
                "text-[17px] font-semibold tracking-[-0.34px] tabular-nums",
                d.hoje ? "text-surface" : "text-ink",
              )}
            >
              {d.dia}
            </span>
          </span>

          {d.fechado ? (
            <span className="min-w-0 flex-1 text-sm text-ink-2">Fechado</span>
          ) : (
            <span className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="text-sm font-semibold tracking-[-0.14px] text-ink">
                {d.ocupados} de {d.total} horários
              </span>
              <span className="h-1.5 overflow-hidden rounded-[3px] bg-line">
                <span
                  className={cn("block h-full rounded-[3px]", d.aviso ? "bg-accent" : "bg-ink")}
                  style={{ width: `${(d.ocupados / d.total) * 100}%` }}
                />
              </span>
            </span>
          )}

          {d.aviso && (
            <span className="shrink-0 text-xs font-semibold text-accent-strong">{d.aviso}</span>
          )}
          <img src={setaIcon} alt="" width={16} height={16} className="shrink-0" />
        </Link>
      ))}
    </ListGroup>
  );
}
